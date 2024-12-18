import { anthropic } from "@ai-sdk/anthropic";
import Computer from ".";

export const makeTools = (computer: Computer) => {
	return {
		computer: anthropic.tools.computer_20241022({
			displayWidthPx: 1024,
			displayHeightPx: 768,
			execute: async ({ action, coordinate, text }) => {
				switch (action) {
					case "screenshot":
						const screenshot = await computer.screenshot();
						return {
							type: "image",
							image: screenshot,
						};
					case "key":
						if (!text) {
							return "No key provided";
						}
						await computer.key(text);
						return "Pressed keys";
					case "type":
						if (!text) {
							return "No text provided";
						}
						await computer.type(text);
						return "Typed text";
					case "mouse_move":
						if (coordinate) {
							await computer.mouseMove(coordinate[0], coordinate[1]);
							return "Moved mouse";
						}
						return "Invalid coordinate";
					case "left_click":
						await computer.leftClick();
						return "Left clicked";
					case "right_click":
						await computer.rightClick();
						return "Right clicked";
					case "middle_click":
						await computer.middleClick();
						return "Middle clicked";
					case "double_click":
						await computer.doubleClick();
						return "Double clicked";
					case "cursor_position":
						const position = await computer.cursorPosition();
						return `Cursor position: X=${position.x}, Y=${position.y}`;
					default:
						return "Invalid action";
				}
			},
			experimental_toToolResultContent(result) {
				return typeof result === "string"
					? [{ type: "text", text: result }]
					: [{ type: "image", data: result.image, mimeType: "image/png" }];
			},
		}),
		bash: anthropic.tools.bash_20241022({
			execute: async ({ command, restart }) => {
				return await computer.command(command);
			},
		}),
		str_replace_editor: anthropic.tools.textEditor_20241022({
			execute: async ({
				command,
				path,
				file_text,
				insert_line,
				new_str,
				old_str,
				view_range,
			}) => {
				switch (command) {
					case "view":
						return await computer.view(path, view_range);
					case "create":
						await computer.create(path, file_text);
						return "Created file";
					case "insert":
						if (!file_text) {
							return "No file text provided";
						}
						await computer.insert(path, file_text, insert_line);
						return "Inserted text";
					case "str_replace":
						if (!old_str || !new_str) {
							return "No old or new string provided";
						}
						await computer.strReplace(path, old_str, new_str);
						return "Replaced text";
					case "undo_edit":
						await computer.undoEdit(path);
						return "Undid edit";
					default:
						return "Invalid command";
				}
			},
		}),
	};
};
