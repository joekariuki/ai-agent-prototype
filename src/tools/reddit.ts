import type { ToolFn } from "../../lib/types";
import { z } from "zod";
import fetch from "node-fetch";

export const redditToolDefinition = {
  name: "get_reddit_post",
  parameters: z.object({}),
  description: "Get a latest post from Formula 1 subreddit post",
};

type Args = z.infer<typeof redditToolDefinition.parameters>;

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch("https://www.reddit.com/r/formula1/.json").then(
    (res) => res.json()
  );

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }));

  return JSON.stringify(relevantInfo, null, 2);
};
