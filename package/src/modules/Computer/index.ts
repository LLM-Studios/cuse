import { HttpClient } from "../../lib/http";
import { makeTools } from "./tools";

interface ComputerConfig {
	baseUrl: string;
	displayNum: number;
	width: number;
	height: number;
}

const defaults: ComputerConfig = {
	baseUrl: "http://localhost:8000",
	displayNum: 1,
	width: 1024,
	height: 768,
};

export default class Computer {
	public displayNum: number;
	public width: number;
	public height: number;
	private httpClient: HttpClient;
	public tools = makeTools(this);

	constructor(config?: ComputerConfig) {
		this.httpClient = new HttpClient(config?.baseUrl || defaults.baseUrl);
		this.displayNum = config?.displayNum || defaults.displayNum;
		this.width = config?.width || defaults.width;
		this.height = config?.height || defaults.height;
	}

	public screenshot(): Promise<string> {
		return this.httpClient.request({
			url: "/computer/screenshot",
			method: "GET",
		});
	}

	public key(key: string): Promise<void> {
		return this.httpClient.request({
			url: "/computer/key",
			method: "POST",
			query: { key },
		});
	}

	public type(text: string): Promise<void> {
		return this.httpClient.request({
			url: "/computer/type",
			method: "POST",
			query: { text },
		});
	}

	public mouseMove(x: number, y: number): Promise<void> {
		return this.httpClient.request({
			url: "/computer/mouse-move",
			method: "POST",
			query: { x, y },
		});
	}

	public leftClick(): Promise<void> {
		return this.httpClient.request({
			url: "/computer/left-click",
			method: "POST",
		});
	}

	public rightClick(): Promise<void> {
		return this.httpClient.request({
			url: "/computer/right-click",
			method: "POST",
		});
	}

	public middleClick(): Promise<void> {
		return this.httpClient.request({
			url: "/computer/middle-click",
			method: "POST",
		});
	}

	public doubleClick(): Promise<void> {
		return this.httpClient.request({
			url: "/computer/double-click",
			method: "POST",
		});
	}

	public cursorPosition(): Promise<{ x: number; y: number }> {
		return this.httpClient.request({
			url: "/computer/cursor-position",
			method: "GET",
		});
	}

	public command(command: string): Promise<string> {
		return this.httpClient.request({
			url: "/bash/command",
			method: "POST",
			query: { command },
		});
	}

	public restart(): Promise<void> {
		return this.httpClient.request({
			url: "/bash/restart",
			method: "POST",
		});
	}

	public view(path: string, view_range?: number[]): Promise<string> {
		return this.httpClient.request({
			url: "/text-editor/view",
			method: "POST",
			query: { path, view_range },
		});
	}

	public create(path: string, file_text?: string): Promise<void> {
		return this.httpClient.request({
			url: "/text-editor/create",
			method: "POST",
			query: { path, file_text },
		});
	}

	public strReplace(
		path: string,
		old_str: string,
		new_str: string
	): Promise<void> {
		return this.httpClient.request({
			url: "/text-editor/str-replace",
			method: "POST",
			query: { path, old_str, new_str },
		});
	}

	public insert(
		path: string,
		text: string,
		insert_line?: number
	): Promise<void> {
		return this.httpClient.request({
			url: "/text-editor/insert",
			method: "POST",
			query: { path, text, insert_line },
		});
	}

	public undoEdit(path: string): Promise<void> {
		return this.httpClient.request({
			url: "/text-editor/undo-edit",
			method: "POST",
			query: { path },
		});
	}
}
