# 🚀 Cuse

**AI Computer Use Abstraction Layer** — toolkit for implementing computer usage capabilities for AI agents 🤖

## ✨ Features

- 💻 Computer Interaction: screenshots, typing, mouse actions
- 📝 Text Editor Operations: view, create, edit files
- 🔧 Command Execution: terminal commands, restart
- 🔌 Extensible Framework: customizable functionalities
- Currently supports **Linux Ubuntu** via local Docker image 🚀

## 🚀 Quickstart

```bash
npm install cuse
```

🚧 Docker is required to run the Linux Ubuntu instance.

```bash
npx cuse linux-setup
npx cuse linux-start
```

## ⚡ Usage

- **Linux Implementation Available**: Use the `Computer` class to interact with the Linux Ubuntu instance.
- Methods for:
  - **Computer Interaction**: `screenshot()`, `key()`, `type()`, `mouseMove()`, `click()`, etc.
  - **Terminal Commands**: `command()`, `restart()`
  - **Text Editor**: `view()`, `create()`, `strReplace()`, `insert()`, `undoEdit()`

### 💡 Example Implementation

- Example using `Computer` client:

```typescript
import { Computer } from "cuse";

const computer = new Computer();

await computer.type("Hello, world! 🌍");
await computer.mouseMove(500, 300);
await computer.leftClick();
```

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
