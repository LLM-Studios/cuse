# 🚀 Cuse

**AI Computer Use Abstraction Layer** — toolkit for implementing computer usage capabilities for AI agents 🤖

## ✨ Features

- 💻 Computer Interaction: screenshots, typing, mouse actions
- 📝 Text Editor Operations: view, create, edit files
- 🔧 Command Execution: terminal commands, restart
- 🔌 Extensible Framework: customizable functionalities
- Currently supports **Linux Ubuntu** via local Docker image 🚀

## 🚀 Quickstart

Setup and start the Linux Ubuntu instance:

```bash
npx @llmstudios/cuse start
```

Install the Cuse package:

```bash
npm install @llmstudios/cuse
```

Create a `Computer` instance

```typescript
import { Computer } from "@llmstudios/cuse";

const computer = new Computer();
```

Use the `computer.tools` in your AI SDK tool parameter

```typescript
const tools = computer.tools;

const stream = streamText({
	model: anthropic("claude-3-5-sonnet-latest"),
	messages,
	tools: {
		...computer.tools,
	},
	maxSteps: 30,
});
```

## ⚡ Usage

- **Linux Implementation Available**: Use the `Computer` class to interact with the Linux Ubuntu instance.
- Methods for:
  - **Computer Interaction**: `screenshot()`, `key()`, `type()`, `mouseMove()`, `click()`, etc.
  - **Terminal Commands**: `command()`, `restart()`
  - **Text Editor**: `view()`, `create()`, `strReplace()`, `insert()`, `undoEdit()`

## 🛣️ Roadmap

- 🌐 macOS, Windows, Cloud VM support
- 🔑 Authentication Injection
- ☁️ Hosted Service
- 🧠 Stateful Machines
- 📹 React Components for VM video streaming

## 🤝 Contributing

- Suggestions, bug reports, feature requests: open issue or pull request

## 📜 License

- MIT License — see [LICENSE](LICENSE) file

## 💬 Get in Touch

- Join community discussions, feature requests, or just say hello 👋

## 📚 References

- Created by [LLM Studios](https://llmstudios.de/)
- Caution Notice by [Anthropic](https://github.com/anthropics/anthropic-quickstarts/blob/main/computer-use-demo/README.md)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=LLM-Studios/cuse&type=Date&theme=dark)](https://star-history.com/#LLM-Studios/cuse&Date)
