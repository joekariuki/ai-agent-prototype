import { runLLM } from "../../src/llm";
import { generateImageToolDefinition } from "../../src/tools/generateImage";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from "../utils";

runEval("generateImage", {
  task: (input) =>
    runLLM({
      messages: [{ role: "user", content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: "Generate an image of a cat.",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
});
