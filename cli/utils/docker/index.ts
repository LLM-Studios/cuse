import { execa } from "execa";
import { imagesByOS } from "../../../config/images.js";
import Docker from "dockerode";

interface ComputerInfo {
	identifier: string;
	os: string;
	containerId: string;
	ports: Record<number, number>;
	api: string;
	vnc: string;
}

const docker = new Docker();

async function containerExists(name: string): Promise<boolean> {
	try {
		const { stdout } = await execa("docker", [
			"ps",
			"-a",
			"--filter",
			`name=${name}`,
			"--format",
			"{{.Names}}",
		]);
		return stdout.trim().split("\n").includes(name);
	} catch {
		return false;
	}
}

async function containerIsRunning(name: string): Promise<boolean> {
	try {
		const { stdout } = await execa("docker", [
			"ps",
			"--filter",
			`name=${name}`,
			"--filter",
			"status=running",
			"--format",
			"{{.Names}}",
		]);
		return stdout.trim().split("\n").includes(name);
	} catch {
		return false;
	}
}

/**
 * Parse `docker port <container>` output to find host ports.
 * The output lines look like:
 * "5900/tcp -> 0.0.0.0:32768"
 */
async function getHostPorts(containerIdOrName: string) {
	const { stdout } = await execa("docker", ["port", containerIdOrName]);
	// Example lines:
	// 5900/tcp -> 0.0.0.0:32768
	// 6080/tcp -> 0.0.0.0:32769
	// 8000/tcp -> 0.0.0.0:32770

	const ports: Record<number, number> = {};
	for (const line of stdout.trim().split("\n")) {
		const match = line.match(/^(\d+)\/tcp -> [0-9.:]+:(\d+)$/);
		if (match) {
			const containerPort = parseInt(match[1], 10);
			const hostPort = parseInt(match[2], 10);
			ports[containerPort] = hostPort;
		}
	}
	return ports;
}

/**
 * Start a computer container given an OS.
 * Defaults to "linux" if OS is not specified.
 * If an identifier is provided, the container will be named and reused if it already exists.
 *
 * Returns an object containing:
 * - The container name/ID.
 * - The mapped host ports for 5900, 6080, and 8000.
 * - A main URL (using the host port mapped to 8000).
 */
export async function startComputer(
	os: string = "linux",
	identifier: string
): Promise<ComputerInfo> {
	const image = imagesByOS[os];
	if (!image) {
		throw new Error(`OS "${os}" is not supported.`);
	}

	const exists = await containerExists(identifier);
	if (exists) {
		// If container exists, check if it's running
		const running = await containerIsRunning(identifier);
		if (running) {
			// It's already running; just return the info
			return getByIdentifier(identifier);
		} else {
			// Container exists but not running, so start it
			await execa("docker", ["start", identifier]);
			return getByIdentifier(identifier);
		}
	} else {
		// Container does not exist, so run a new named one with ephemeral ports
		const { stdout } = await execa("docker", [
			"run",
			"-d",
			"--name",
			identifier,
			"-p",
			"0:5900",
			"-p",
			"0:6080",
			"-p",
			"0:8000",
			image,
		]);

		return getByIdentifier(identifier);
	}
}

const getComputerInfo = (container: Docker.ContainerInfo): ComputerInfo => {
	const os =
		Object.entries(imagesByOS).find(
			([, image]) => container.Image === image
		)?.[0] || "unknown";

	// Build the ports record
	const ports: Record<number, number> = {};
	for (const portInfo of container.Ports) {
		const { PrivatePort, PublicPort } = portInfo;
		// Ensure that PublicPort is defined before assigning
		if (PrivatePort && PublicPort) {
			ports[PrivatePort] = PublicPort;
		}
	}

	// Derive a URL based on the 8000 port mapping, if available
	const mainPort = ports[8000];
	const api = mainPort ? `http://localhost:${mainPort}` : "";
	const vnc = ports[6080] ? `http://localhost:${ports[6080]}` : "";
	return {
		identifier: container.Names[0].replace("/", "") || "unnamed",
		os,
		containerId: container.Id.slice(0, 12),
		ports,
		api,
		vnc,
	};
};

const getByIdentifier = async (identifier: string): Promise<ComputerInfo> => {
	const all = await getAllRunningComputers();
	const computer = all.find((c) => c.identifier === identifier);
	if (!computer) {
		throw new Error(`Computer with identifier "${identifier}" not found.`);
	}
	return computer;
};

export async function getAllRunningComputers(): Promise<ComputerInfo[]> {
	const containers = await docker.listContainers({
		all: false, // only running containers
		filters: {
			ancestor: Object.values(imagesByOS),
		},
	});

	return containers.map(getComputerInfo);
}

export async function cleanAllComputers(): Promise<void> {
	// List all containers (running or not) based on the ancestor images
	const containers = await docker.listContainers({
		all: true,
		filters: {
			ancestor: Object.values(imagesByOS),
		},
	});

	await Promise.all(
		containers.map(async (containerInfo) => {
			const container = docker.getContainer(containerInfo.Id);

			// If the container is running, stop it first
			if (containerInfo.State === "running") {
				await container.stop().catch((err) => {
					console.warn(
						`Failed to stop container ${containerInfo.Id}: ${err.message}`
					);
				});
			}

			// Remove the container
			await container.remove({ force: true }).catch((err) => {
				console.warn(
					`Failed to remove container ${containerInfo.Id}: ${err.message}`
				);
			});
		})
	);
}