/**
 * Scorers for AI Agent Evaluation
 * 
 * This module provides custom scoring functions for evaluating AI agent responses,
 * particularly focusing on tool call accuracy and correctness.
 */

import type { Scorer } from "autoevals";

/**
 * Evaluates whether an AI agent correctly identified and called the expected tool
 * 
 * This scorer checks if the AI response contains a tool call that matches the expected tool call.
 * It specifically verifies:
 * 1. The response is from an assistant role
 * 2. The response contains exactly one tool call
 * 3. The tool call's function name matches the expected function name
 * 
 * @returns A score of 1 if the tool call matches, 0 otherwise
 */
export const ToolCallMatch: Scorer<any, {}> = async ({
  // input - typically use this for analyzing inputs,
  output,
  expected,
}) => {
  // Calculate score based on exact match of tool call function name
  // All conditions must be true to receive a score of 1, otherwise 0
  const score =
    // Verify the response is from an assistant
    output.role === "assistant" &&
    // Verify tool_calls exists and is an array
    Array.isArray(output.tool_calls) &&
    // Verify there's exactly one tool call
    output.tool_calls.length === 1 &&
    // Verify the function name matches the expected function name
    output.tool_calls[0].function?.name ===
      expected.tool_calls[0].function?.name
      ? 1  // Perfect match
      : 0;  // No match

  // Return the scorer result with name and calculated score
  return {
    name: "ToolCallMatch",  // Identifier for this scorer
    score,                  // Binary score: 1 for match, 0 for no match
  };
};
