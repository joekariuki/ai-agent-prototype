import type { ToolFn } from "../../lib/types";

import { z } from "zod";

import { queryMovies } from "../rag/query";

export const movieSearchToolDefinition = {
  name: "movie_search",
  parameters: z.object({
    query: z.string().describe(`The search query for finding movies.`),
    genre: z.string().optional().describe(`Filter movies by genre.`),
    director: z.string().optional().describe("Filter movies by director"),
  }),
  description:
    "Searches for movies and information about them, including title, year, genre, director, actors, rating, and description. Use this to answer questions about movies.",
};

type Args = z.infer<typeof movieSearchToolDefinition.parameters>;

export const movieSearch: ToolFn<Args> = async ({ userMessage, toolArgs }) => {
  const { query } = toolArgs;

  let results;

  try {
    results = await queryMovies(query);
  } catch (error) {
    console.error(error);
    return "Error: Could not query the db to get movies.";
  }

  const formattedResults = results.map((result: any) => {
    const { metadata, data } = result;
    return {
      ...metadata,
      description: data,
    };
  });

  return JSON.stringify(formattedResults, null, 2);
};
