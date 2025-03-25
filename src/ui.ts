import ora from "ora";

import type { AIMessage } from "../lib/types";

export const showLoader = (text: string) => {
  const spinner = ora({
    text: text,
    color: "cyan",
  }).start();

  return {
    stop: () => spinner.stop(),
    success: (text?: string) => spinner.succeed(text),
    error: (text?: string) => spinner.fail(text),
    update: (text: string) => (spinner.text = text),
  };
};

export const logMessage = (message: AIMessage) => {
  const roleColors = {
    user: "\x1b[36m", // cyan
    assistant: "\x1b[32m", // green
  };

  const reset = "\x1b[0m";
  const role = message.role;
  const color = roleColors[role as keyof typeof roleColors] || "\x1b[37m"; // default to white

  if (role === "tool") {
    return;
  }

  // Log assistant messages
  if (role === "assistant") {
    // Check if tool_calls are in message, log function name
    if ("tool_calls" in message && message.tool_calls) {
      message.tool_calls.forEach((tool) => {
        console.log(`\n${color}[ASSISTANT]${reset}`);
        console.log(`${tool.function.name}\n`);
      });
      return;
    }

    // Check if message has content, then log message
    if (message.content) {
      console.log(`\n${color}[ASSISTANT]${reset}`);
      console.log(`${message.content}\n`);
    }
  }
};
