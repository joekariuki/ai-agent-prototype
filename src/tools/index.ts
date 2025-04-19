import { generateImageToolDefinition } from "./generateImage";
import { dadJokeToolDefinition } from "./dadJoke";
import { redditToolDefinition } from "./reddit";
import { movieSearchToolDefinition } from "./movieSearch";

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
  movieSearchToolDefinition,
];
