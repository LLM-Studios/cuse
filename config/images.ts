/**
 * A mapping from supported OS to their corresponding Docker image.
 */
export const imagesByOS: Record<string, string> = {
	linux: process.env.LINUX_IMAGE || "llmstudios/cuse/linux",
};
