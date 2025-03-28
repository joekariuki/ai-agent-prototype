import type { AIMessage } from "../lib/types";
import { addMessages, getMessages } from "./memory";
import { runLLM } from "./llm";
import { showLoader, logMessage } from "./ui";

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any[];
}) => {
  await addMessages([{ role: "user", content: userMessage }]);

  const loader = showLoader("Thinking...");
  const history = await getMessages();

  const response = await runLLM({ messages: history, tools });

  // Check if tool calls and log
  if (response.tool_calls) {
    console.log(response.tool_calls);
  }

  await addMessages([response]);

  logMessage(response);
  loader.stop();

  return getMessages();
};
