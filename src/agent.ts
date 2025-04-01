import type { AIMessage } from "../lib/types";
import { addMessages, getMessages, saveToolResponse } from "./memory";
import { runLLM } from "./llm";
import { showLoader, logMessage } from "./ui";
import { runTool } from "./toolRunner";

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

  await addMessages([response]);

  // Check if tool calls and log
  if (response.tool_calls) {
    const toolCall = response.tool_calls[0];

    loader.update(`Executing ${toolCall.function.name}`);

    const toolResponse = await runTool(toolCall, userMessage);

    await saveToolResponse(toolCall.id, toolResponse);

    loader.update(`Executed: ${toolCall.function.name}`);
  }

  logMessage(response);
  loader.stop();

  return getMessages();
};
