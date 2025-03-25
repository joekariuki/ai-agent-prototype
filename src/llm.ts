import type { AIMessage } from "../lib/types";
import { openai } from "./ai";

export const runLLM = async ({ messages }: { messages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    temperature: 0.1,
    messages,
  });

  return response.choices[0].message.content;
};
