/**
 * A mapping from supported OS to their corresponding Docker image.
 */
export const imagesByOS: Record<string, string> = {
	linux: process.env.LINUX_IMAGE || "llmstudios/cuse/linux",
};

export const DEFAULT_PORT_MAPPINGS = {
	API: (process.env.API_PORT ?? 9001) as number,
	VNC: (process.env.VNC_PORT ?? 9002) as number,
	NOVNC: (process.env.NOVNC_PORT ?? 9003) as number,
};

export const DEFAULT_PORTS = {
	API: (process.env.API_PORT ?? 8000) as number,
	VNC: (process.env.VNC_PORT ?? 5900) as number,
	NOVNC: (process.env.NOVNC_PORT ?? 6080) as number,
};

export const DEFAULT_IDENTIFIER = require(process.cwd() + "/package.json").name;

export const BASE_URL = "http://localhost";
