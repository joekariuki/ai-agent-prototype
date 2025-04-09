import { runLLM } from "../../src/llm";
import { dadJokeToolDefinition } from "../../src/tools/dadJoke";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from "../utils";

runEval("dadJoke", {
  task: (input) =>
    runLLM({
      messages: [{ role: "user", content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: "Tell me a dad joke.",
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
});
