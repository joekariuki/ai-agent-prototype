import { generateImageToolDefinition } from "./generateImage";
import { dadJokeToolDefinition } from "./dadJoke";
import { redditToolDefinition } from "./reddit";

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
];
