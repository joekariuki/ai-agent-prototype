import type OpenAI from "openai";
import { generateImage } from "./tools/generateImage";
import { dadJoke } from "./tools/dadJoke";
import { reddit } from "./tools/reddit";
import { movieSearch, movieSearchToolDefinition } from "./tools/movieSearch";
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
      const image = await generateImage(input);
      return image;
    case "get_dad_joke":
      return dadJoke(input);
    case "get_reddit_post":
      return reddit(input);
    case movieSearchToolDefinition.name:
      return movieSearch(input);
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};
