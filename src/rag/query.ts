import { Index as UpstashIndex } from "@upstash/vector";

// Initialize the Upstash Vector client
const index = new UpstashIndex();

type MovieMetaData = {
  title?: string;
  year?: number;
  genre?: string;
  director?: string;
  actors?: string;
  rating?: number;
  votes?: number;
  revenue: number;
  metascore: number;
};

export const queryMovies = async (
  query: string,
  filters?: Partial<MovieMetaData>,
  topK: number = 5
) => {
  // Build filter string if needed
  let filterStr = "";
  if (filters) {
    const filterParts = Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}: ${value}`);

    if (filterParts.length > 0) {
      filterStr = filterParts.join(" AND ");
    }
  }

  // Query vector store
  const results = await index.query({
    data: query,
    topK,
    filter: filterStr || undefined,
    includeMetadata: true,
    includeData: true,
  });

  return results;
};
