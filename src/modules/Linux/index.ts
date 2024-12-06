import { Computer } from "../Computer";

export class Linux extends Computer {
    static containerName = 'computer_use_container';
    static typingDelay = 12;
    static typingGroupSize = 50;
    private displayPrefix = `DISPLAY=:${this.displayNum}`;
    private xdotool = `${this.displayPrefix} xdotool`;

    async screenshot(): Promise<string> {
        const path = `./screenshot_${new Date().toISOString()}.png`
        await this.command(`${this.displayPrefix} scrot -p ${path}`)
        return await this.command(`cat ${path} | base64`)
    }

    async key(key: string): Promise<void> {
        await this.command(`${this.xdotool} key -- ${key}`)
    }

    async type(text: string): Promise<void> {
        const groups = text.match(new RegExp(`.{1,${Linux.typingGroupSize}}`, 'g')) ?? []
        for (const group of groups) {
            await this.command(`${this.xdotool} type --delay ${Linux.typingDelay} -- ${group}`)
        }
    }

    async mouseMove(x: number, y: number): Promise<void> {
        await this.command(`${this.xdotool} mousemove --sync ${x} ${y}`)
    }

    async leftClick(): Promise<void> {
        await this.command(`${this.xdotool} click --repeat 1 --delay 100 --button 1`)
    }

    async rightClick(): Promise<void> {
        await this.command(`${this.xdotool} click --repeat 1 --delay 100 --button 3`)
    }

    async middleClick(): Promise<void> {
        await this.command(`${this.xdotool} click --repeat 1 --delay 100 --button 2`)
    }

    async doubleClick(): Promise<void> {
        await this.command(`${this.xdotool} click --repeat 2 --delay 100 --button 1`)
    }

    async cursorPosition(): Promise<{ x: number; y: number; }> {
        const res = await this.command(`${this.xdotool} getmouselocation --shell`)
        const x = parseInt(res.split("X=")[1].split("\n")[0])
        const y = parseInt(res.split("Y=")[1].split("\n")[0])
        return { x, y }
    }

    async command(command: string): Promise<string> {
        const process = await Bun.spawn({
            cmd: ['bash', '-c', `docker exec -i ${Linux.containerName} sh -c "${command}"`]
        })
        const [stdout, stderr] = await Promise.all([
            new Response(process.stdout).text(),
            new Response(process.stderr).text(),
        ])
        console.log(stdout, stderr)
        if (stderr) {
            throw new Error(stderr)
        }
        return stdout.trim()
    }

    async restart(): Promise<void> {
        await this.command(`bash`)
    }

    view(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    create(path: string, file_text?: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    strReplace(path: string, old_str: string, new_str: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    insert(path: string, text: string, insert_line?: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    undoEdit(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
