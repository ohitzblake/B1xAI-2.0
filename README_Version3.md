# BlxAi 2.0

A ChatGPT-style AI code generator that turns natural language prompts into ready-to-use code for websites, mods, and more.

## Features

- Chat interface with sidebar and message bubbles
- Generate code for:
  - Websites (HTML/CSS/JS)
  - Minecraft mods (Java, Forge)
  - Unity mods (C#)
  - More!
- Prompt-based UI
- Download generated code
- Easy to extend

## Getting Started

1. Clone the repo
2. Add your OpenAI API key to `backend/.env`
3. Run:  
   `npm install`  
   `npm run dev`
4. Visit [http://localhost:3000](http://localhost:3000)

---

> **Note:** This MVP returns code as plain text. For multi-file projects or ZIP downloads, extend the backend to generate and serve ZIPs.