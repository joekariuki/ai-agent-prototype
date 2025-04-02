import type { ToolFn } from "../../lib/types";
import { z } from "zod";
import { openai } from "../ai";

export const generateImageToolDefinition = {
  name: "generate_image",
  parameters: z.object({
    prompt: z.string().describe(
      `prompt for the image. 
      Be sure to consider the user's original message when making the prompt. 
      If you are unsure, then as the user to provide more details`
    ),
  }),
  description: "Generate an image",
};

type Args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { prompt } = toolArgs;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  if (!response.data[0].url) {
    throw new Error("Error: No image url was generated");
  }
  return response.data[0].url;
};
