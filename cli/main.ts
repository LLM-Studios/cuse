import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import {
	startComputer,
	getAllRunningComputers,
	cleanAllComputers,
} from "./utils/docker/index";

// Supported OS list
const supportedOS = ["linux"]; // You can add more when they are supported

function haiku() {
	var adjs = [
			"autumn",
			"hidden",
			"bitter",
			"misty",
			"silent",
			"empty",
			"dry",
			"dark",
			"summer",
			"icy",
			"delicate",
			"quiet",
			"white",
			"cool",
			"spring",
			"winter",
			"patient",
			"twilight",
			"dawn",
			"crimson",
			"wispy",
			"weathered",
			"blue",
			"billowing",
			"broken",
			"cold",
			"damp",
			"falling",
			"frosty",
			"green",
			"long",
			"late",
			"lingering",
			"bold",
			"little",
			"morning",
			"muddy",
			"old",
			"red",
			"rough",
			"still",
			"small",
			"sparkling",
			"throbbing",
			"shy",
			"wandering",
			"withered",
			"wild",
			"black",
			"young",
			"holy",
			"solitary",
			"fragrant",
			"aged",
			"snowy",
			"proud",
			"floral",
			"restless",
			"divine",
			"polished",
			"ancient",
			"purple",
			"lively",
			"nameless",
		],
		nouns = [
			"waterfall",
			"river",
			"breeze",
			"moon",
			"rain",
			"wind",
			"sea",
			"morning",
			"snow",
			"lake",
			"sunset",
			"pine",
			"shadow",
			"leaf",
			"dawn",
			"glitter",
			"forest",
			"hill",
			"cloud",
			"meadow",
			"sun",
			"glade",
			"bird",
			"brook",
			"butterfly",
			"bush",
			"dew",
			"dust",
			"field",
			"fire",
			"flower",
			"firefly",
			"feather",
			"grass",
			"haze",
			"mountain",
			"night",
			"pond",
			"darkness",
			"snowflake",
			"silence",
			"sound",
			"sky",
			"shape",
			"surf",
			"thunder",
			"violet",
			"water",
			"wildflower",
			"wave",
			"water",
			"resonance",
			"sun",
			"wood",
			"dream",
			"cherry",
			"tree",
			"fog",
			"frost",
			"voice",
			"paper",
			"frog",
			"smoke",
			"star",
		];

	return (
		adjs[Math.floor(Math.random() * (adjs.length - 1))] +
		"_" +
		nouns[Math.floor(Math.random() * (nouns.length - 1))]
	);
}

interface ComputerInfo {
	identifier: string;
	os: string;
	containerId: string;
	ports: Record<number, number>;
	url: string;
}

async function promptForOS(osArg?: string): Promise<string> {
	// If os is provided and supported, just return it
	if (osArg && supportedOS.includes(osArg)) {
		return osArg;
	}

	// Otherwise, prompt the user
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

async function promptForIdentifier(identifierArg?: string): Promise<string> {
	if (identifierArg) {
		return identifierArg;
	}

	const randomIdentifier = haiku();

	const { identifier } = await inquirer.prompt([
		{
			type: "input",
			name: "identifier",
			message: "Enter a name for this computer: ",
			default: randomIdentifier,
		},
	]);

	return identifier || randomIdentifier;
}

async function promptForPruneConfirmation(): Promise<boolean> {
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

yargs(hideBin(process.argv))
	.scriptName("cuse")
	.command(
		["start [os] [identifier]", "$0"],
		"Start a Computer",
		(yargs) =>
			yargs
				.positional("os", {
					description:
						"The operating system. Currently only linux is supported.",
					type: "string",
					choices: ["windows", "macos", "linux", "w", "m", "l"],
					coerce: (arg: string) => {
						const aliases: Record<string, string> = {
							w: "windows",
							m: "macos",
							l: "linux",
						};
						return aliases[arg] || arg;
					},
				})
				.positional("identifier", {
					description: "Optional identifier for the computer",
					type: "string",
					default: undefined,
				}),
		async (argv) => {
			let os = argv.os as string;
			let identifier = argv.identifier as string;

			// Prompt if os is not provided or invalid
			os = await promptForOS(os);

			// If OS is not supported, you can handle that here
			if (!supportedOS.includes(os)) {
				console.error("This OS is not supported yet. Coming soon!");
				process.exit(1);
			}

			identifier = await promptForIdentifier(identifier);

			console.info(
				`Starting ${
					os.charAt(0).toUpperCase() + os.slice(1)
				} Computer${` (${identifier})`}...`
			);

			const computer = await startComputer(os, identifier);
			console.info(
				`\n${os.charAt(0).toUpperCase() + os.slice(1)} computer started!`
			);
			console.info(`Container: ${computer.containerId}`);
			console.info(
				`API: ${computer.api ? computer.api : "No main URL available"}`
			);
			console.info(
				`VNC: ${computer.vnc ? computer.vnc : "No VNC URL available"}`
			);

			const runningComputers = await getAllRunningComputers();

			if (runningComputers.length) {
				console.info("\nRunning Computers:");
				console.table(
					runningComputers.map((c) => ({
						identifier: c.identifier,
						os: c.os,
						containerId: c.containerId,
						api: c.ports[8000] ? `http://localhost:${c.ports[8000]}` : "N/A",
						vnc: c.ports[6080] ? `http://localhost:${c.ports[6080]}` : "N/A",
					})),
					["identifier", "os", "containerId", "api", "vnc"]
				);
			} else {
				console.info("No computers are currently running.");
			}
		}
	)
	.command("prune", "Remove all computers", async () => {
		const confirm = await promptForPruneConfirmation();
		if (!confirm) {
			console.info("Operation cancelled.");
			return;
		}

		console.info("Removing all computers...");
		await cleanAllComputers();
		console.info("Computers have been removed.");
	})
	.help()
	.demandCommand(0, 0)
	.strict()
	.parse();
