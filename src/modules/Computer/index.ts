import { HttpClient } from "@/lib/http";

export class Computer extends HttpClient {
    public displayNum: number;
    public width: number;
    public height: number;

    constructor(
        baseUrl: string = "http://localhost:8000",
        displayNum: number = 1,
        width: number = 1024,
        height: number = 768
    ) {
        super(baseUrl);
        this.displayNum = displayNum;
        this.width = width;
        this.height = height;
    }

    public screenshot(): Promise<string> {
        return this.request({
            url: "/computer/screenshot",
            method: "GET",
        });
    };  

    public key(key: string): Promise<void> {
        return this.request({
            url: "/computer/key",
            method: "POST",
            query: { key },
        });
    }

    public type(text: string): Promise<void> {
        return this.request({
            url: "/computer/type",
            method: "POST",
            query: { text },
        });
    }

    public mouseMove(x: number, y: number): Promise<void> {
        return this.request({
            url: "/computer/mouse-move",
            method: "POST",
            query: { x, y },
        });
    }

    public leftClick(): Promise<void> {
        return this.request({
            url: "/computer/left-click",
            method: "POST",
        });
    }   

    public rightClick(): Promise<void> {
        return this.request({
            url: "/computer/right-click",
            method: "POST",
        });
    }

    public middleClick(): Promise<void> {
        return this.request({
            url: "/computer/middle-click",
            method: "POST",
        });
    }

    public doubleClick(): Promise<void> {
        return this.request({
            url: "/computer/double-click",
            method: "POST",
        });
    }

    public cursorPosition(): Promise<{ x: number, y: number }> {
        return this.request({
            url: "/computer/cursor-position",
            method: "GET",
        });
    }

    public command(command: string): Promise<string> {
        return this.request({
            url: "/bash/command",
            method: "POST",
            query: { command },
        });
    }

    public restart(): Promise<void> {
        return this.request({
            url: "/bash/restart",
            method: "POST",
        });
    }

    public view(path: string, view_range?: number[]): Promise<string> {
        return this.request({
            url: "/text-editor/view",
            method: "POST",
            query: { path, view_range },
        });
    }

    public create(path: string, file_text?: string): Promise<void> {
        return this.request({
            url: "/text-editor/create",
            method: "POST",
            query: { path, file_text },
        });
    }

    public strReplace(path: string, old_str: string, new_str: string): Promise<void> {
        return this.request({
            url: "/text-editor/str-replace",
            method: "POST",
            query: { path, old_str, new_str },
        });
    }

    public insert(path: string, text: string, insert_line?: number): Promise<void> {
        return this.request({
            url: "/text-editor/insert",
            method: "POST",
            query: { path, text, insert_line },
        });
    }

    public undoEdit(path: string): Promise<void> {
        return this.request({
            url: "/text-editor/undo-edit",
            method: "POST",
            query: { path },
        });
    }
}
