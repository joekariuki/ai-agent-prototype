# AI Agent Prototype

A TypeScript-based AI agent prototype that leverages OpenAI's API to create an interactive agent capable of executing various tools based on user input. This project demonstrates how to build a simple yet powerful AI agent system with tool execution capabilities.

## Features

- 🤖 AI-powered agent that processes natural language requests
- 🛠️ Extensible tool system for executing various tasks
- 🔄 Persistent conversation memory
- 🖼️ Image generation using DALL-E 3
- 😄 Dad joke retrieval tool
- 📱 Reddit content fetching
- 📝 Clean, TypeScript-based implementation
- 🚀 Built with Bun for fast execution

## Prerequisites

- [Bun](https://bun.sh) v1.1.30 or later
- OpenAI API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-agent-prototype.git
   cd ai-agent-prototype
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

Run the agent with a user message:

```bash
bun run index.ts "Generate an image of a sunset over mountains"
```

Or use the npm script:

```bash
npm start "Tell me a dad joke"
```

## Project Structure

```
ai-agent-prototype/
├── .env                # Environment variables
├── index.ts            # Entry point
├── db.json             # Conversation memory storage
├── lib/                # Type definitions
├── src/
│   ├── agent.ts        # Main agent logic
│   ├── llm.ts          # LLM integration
│   ├── memory.ts       # Conversation memory management
│   ├── systemPrompt.ts # System prompt for the AI
│   ├── toolRunner.ts   # Tool execution logic
│   ├── ui.ts           # Terminal UI components
│   └── tools/          # Available tools
│       ├── index.ts    # Tool exports
│       ├── dadJoke.ts  # Dad joke tool
│       ├── generateImage.ts # Image generation tool
│       └── reddit.ts   # Reddit content fetching tool
└── tsconfig.json       # TypeScript configuration
```

## How It Works

1. The user provides a natural language message
2. The agent processes the message using OpenAI's API
3. If the AI determines a tool should be used, it calls the appropriate tool
4. The tool executes and returns a result
5. The AI incorporates the tool result into its response
6. The conversation continues with the agent maintaining context

## Available Tools

### Image Generation

Generate images using DALL-E 3 based on text prompts.

### Dad Joke Retriever

Fetch random dad jokes or search for jokes by topic.

### Reddit Content Fetcher

Retrieve posts from specified subreddits.

## Extending with New Tools

To add a new tool:

1. Create a new file in the `src/tools` directory
2. Define the tool schema using Zod
3. Implement the tool functionality
4. Add the tool to the exports in `src/tools/index.ts`

Example tool structure:

```typescript
import type { ToolFn } from "../../lib/types";
import { z } from "zod";

export const myToolDefinition = {
  name: "my_tool_name",
  parameters: z.object({
    param1: z.string().describe("Description of parameter 1"),
    param2: z.number().describe("Description of parameter 2"),
  }),
  description: "Description of what the tool does",
};

type Args = z.infer<typeof myToolDefinition.parameters>;

export const myTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { param1, param2 } = toolArgs;
  // Tool implementation
  return "Tool result";
};
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Build an AI Agent from Scratch](https://frontendmasters.com/courses/ai-agents/) course on Frontend Masters, taught by Scott Moss
- [OpenAI](https://openai.com/) for their AI models and APIs
- [Bun](https://bun.sh) for the fast JavaScript runtime
- [Zod](https://github.com/colinhacks/zod) for TypeScript-first schema validation
