import type OpenAI from "openai";

const getWeather = () => `It's hot, 35 degrees Celsius`;

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolsArgs: JSON.parse(toolCall.function.arguments || "{}"),
  };

  switch (toolCall.function.name) {
    case "get_weather":
      return getWeather();
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};
