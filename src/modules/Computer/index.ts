
export abstract class Computer {
    public displayNum: number;
    public width: number;
    public height: number;

    constructor(displayNum: number = 1, width: number = 1024, height: number = 768) {
        this.displayNum = displayNum;
        this.width = width;
        this.height = height;
    }

    // Computer
    abstract screenshot(): Promise<string>;
    abstract key(key: string): Promise<void>;
    abstract type(text: string): Promise<void>;
    abstract mouseMove(x: number, y: number): Promise<void>;
    abstract leftClick(): Promise<void>;
    abstract rightClick(): Promise<void>;
    abstract middleClick(): Promise<void>;
    abstract doubleClick(): Promise<void>;
    abstract cursorPosition(): Promise<{ x: number; y: number }>;

    // Bash
    abstract command(command: string): Promise<string>;
    abstract restart(): Promise<void>;

    // Text Editor
    abstract view(path: string, view_range?: number[]): Promise<void>;
    abstract create(path: string, file_text?: string): Promise<void>;
    abstract strReplace(path: string, old_str: string, new_str: string): Promise<void>;
    abstract insert(path: string, text: string, insert_line?: number): Promise<void>;
    abstract undoEdit(path: string): Promise<void>;
}
