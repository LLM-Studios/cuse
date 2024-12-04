
export abstract class Computer {
    // Computer
    abstract screenshot(): Promise<void>;
    abstract key(key: string): Promise<void>;
    abstract type(text: string): Promise<void>;
    abstract mouseMove(x: number, y: number): Promise<void>;
    abstract leftClick(): Promise<void>;
    abstract rightClick(): Promise<void>;
    abstract middleClick(): Promise<void>;
    abstract doubleClick(): Promise<void>;
    abstract cursorPosition(): Promise<{ x: number; y: number }>;

    // Bash
    abstract command(command: string): Promise<void>;
    abstract restart(): Promise<void>;

    // Text Editor
    abstract view(): Promise<void>;
    abstract create(): Promise<void>;
    abstract strReplace(): Promise<void>;
    abstract insert(): Promise<void>;
    abstract undoEdit(): Promise<void>;
}
