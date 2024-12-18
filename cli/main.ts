import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import {
	startComputer,
	startComputerWithIdentifier,
	getAllRunningComputers,
	cleanAllComputers,
} from "./utils/docker/index";
import { haiku } from "./utils/haiku";
import { DEFAULT_IDENTIFIER } from "../config/constants";

const supportedOS = ["linux"];

async function chooseOS(osArg?: string): Promise<string> {
	if (osArg && supportedOS.includes(osArg)) return osArg;

	const { chosenOS } = await inquirer.prompt([
		{
			type: "list",
			name: "chosenOS",
			message: "Select the operating system:",
			choices: supportedOS.map((os) => ({ name: os, value: os })),
			default: "linux",
		},
	]);
	return chosenOS;
}

async function chooseIdentifier(identifierArg?: string): Promise<string> {
	const defaultIdentifier =
		identifierArg ||
		DEFAULT_IDENTIFIER ||
		process.cwd().split("/").pop() ||
		haiku();

	const { identifier } = await inquirer.prompt([
		{
			type: "input",
			name: "identifier",
			message: "Enter a name for this computer:",
			default: defaultIdentifier,
		},
	]);
	return identifier || defaultIdentifier;
}

async function confirmPrune(): Promise<boolean> {
	const { confirm } = await inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Are you sure you want to remove all computers?",
			default: false,
		},
	]);
	return confirm;
}

function printComputerTable(computers: any[]) {
	if (!computers.length) {
		console.info("No computers are currently running.");
		return;
	}
	console.info("\nRunning Computers:");
	console.table(
		computers.map(({ identifier, os, containerId, api, novnc }) => ({
			identifier,
			os,
			containerId,
			api,
			novnc,
		})),
		["identifier", "os", "containerId", "api", "novnc"]
	);
}

async function handleStartCommand(osArg?: string, identifierArg?: string) {
	// Try existing identifier if none given
	if (!osArg && !identifierArg) {
		const existing = await startComputerWithIdentifier(
			DEFAULT_IDENTIFIER
		).catch(() => {});
		if (existing && existing.containerId) {
			console.info(`Computer ${existing.identifier} started!`);
			printComputerTable([existing]);
			return;
		}
		console.info(
			`No computer found with identifier ${DEFAULT_IDENTIFIER}. Starting a new one...`
		);
	}

	const os = await chooseOS(osArg);
	if (!supportedOS.includes(os)) {
		console.error("This OS is not supported yet.");
		process.exit(1);
	}

	const identifier = await chooseIdentifier(identifierArg);
	console.info(
		`Starting ${os[0].toUpperCase() + os.slice(1)} Computer (${identifier})...`
	);

	const computer = await startComputer(os, identifier);
	console.info(`\n${os[0].toUpperCase() + os.slice(1)} computer started!`);
	console.info(`Container: ${computer.containerId}`);
	console.info(`API: ${computer.api || "No main URL available"}`);
	console.info(`VNC: ${computer.novnc || "No VNC URL available"}`);

	const running = await getAllRunningComputers();
	printComputerTable(running);
}

async function handlePruneCommand() {
	if (await confirmPrune()) {
		console.info("Removing all computers...");
		await cleanAllComputers();
		console.info("Computers removed.");
	} else {
		console.info("Operation cancelled.");
	}
}

yargs(hideBin(process.argv))
	.scriptName("cuse")
	.command(
		["start [os] [identifier]", "$0"],
		"Start a Computer",
		(y) =>
			y
				.positional("os", {
					description: "Operating system. Currently only linux is supported.",
					type: "string",
					choices: ["windows", "macos", "linux", "w", "m", "l"],
					coerce: (arg: string) =>
						((
							{ w: "windows", m: "macos", l: "linux" } as Record<string, string>
						)[arg] || arg),
				})
				.positional("identifier", {
					description: "Optional identifier",
					type: "string",
				}),
		(argv) => handleStartCommand(argv.os as string, argv.identifier as string)
	)
	.command("prune", "Remove all computers", handlePruneCommand)
	.help()
	.strict()
	.parse();
