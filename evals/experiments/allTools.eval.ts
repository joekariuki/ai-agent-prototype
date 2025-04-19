import { runLLM } from "../../src/llm";
import { generateImageToolDefinition } from "../../src/tools/generateImage";
import { dadJokeToolDefinition } from "../../src/tools/dadJoke";
import { redditToolDefinition } from "../../src/tools/reddit";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from "../utils";

const allTools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
];

runEval("allTools", {
  task: (input) =>
    runLLM({
      messages: [{ role: "user", content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: "Take a photo of a sunset.",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: "Tell me a dad joke.",
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: "Find me something interesting on reddit.",
      expected: createToolCallMessage(redditToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
});
