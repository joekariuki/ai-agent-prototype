import type { AIMessage } from "../lib/types";
import { openai } from "./ai";
import { zodFunction } from "openai/helpers/zod";

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[];
  tools: any[];
}) => {
  const formattedTools = tools.map(zodFunction);
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    temperature: 0.1,
    messages,
    tools: formattedTools,
    tool_choice: "auto",
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
};
