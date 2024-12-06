# 🚀 AI Computer Use Abstraction Layer

**AI Computer Use Abstraction Layer** — toolkit for implementing computer usage capabilities for AI agents 🤖

## ✨ Features

- 💻 Cross-Platform Computer Interaction: screenshots, typing, mouse actions
- 📝 Text Editor Operations: view, create, edit files
- 🔧 Command Execution: terminal commands, restart
- 🔌 Extensible Framework: customizable functionalities
- Currently supports **Linux Ubuntu** via local Docker image 🚀

## ⚡ Usage

- **Linux Implementation Available**: Use `Linux` class from `@/src/modules/Linux` for setting up Linux Ubuntu interactions
- Implement methods for:
  - **Computer Interaction**: `screenshot()`, `key()`, `type()`, `mouseMove()`, `click()`, etc.
  - **Terminal Commands**: `command()`, `restart()`
  - **Text Editor**: `view()`, `create()`, `strReplace()`, `insert()`, `undoEdit()`

### 💡 Example Implementation

- Example using `Linux` class:

```typescript
import { Linux } from "cuse";

const linux = new Linux();

await linux.type("Hello, world! 🌍");
await linux.mouseMove(500, 300);
await linux.leftClick();
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

