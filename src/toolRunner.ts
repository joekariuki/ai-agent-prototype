import type OpenAI from "openai";
import { generateImage } from "./tools/generateImage";
import { dadJoke } from "./tools/dadJoke";
import { reddit } from "./tools/reddit";
export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case "generate_image":
      return generateImage(input);
    case "get_dad_joke":
      return dadJoke(input);
    case "get_reddit_post":
      return reddit(input);
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};
