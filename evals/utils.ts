export const createToolCallMessage = (toolName: string) => ({
  role: "assistant",
  tool_calls: [
    {
      type: "function",
      function: {
        name: toolName,
      },
    },
  ],
});
