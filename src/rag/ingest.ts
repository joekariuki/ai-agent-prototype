import "dotenv/config";
import { Index as UpstashIndex } from "@upstash/vector";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import ora from "ora";

const index = new UpstashIndex();

// Function to index IMDB movie data
export async function indexMovieData() {
  const spinner = ora("Reading movie data...").start();

  // Read and parse CSV file
  const csvPath = path.join(process.cwd(), "src/rag/imdb_movie_dataset.csv");
  const csvData = fs.readFileSync(csvPath, "utf-8");
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  spinner.text = "Starting movie indexing...";

  // Index each movie
  for (const record of records) {
    spinner.text = `Indexing movie: ${record.Title}`;
    const text = `${record.Title}. ${record.Genre}. ${record.Description}`;

    try {
      await index.upsert({
        id: record.Title, // Using Rank as unique ID
        data: text, // Text will automatically embedded
        metadata: {
          title: record.Title,
          year: Number(record.Year),
          genre: record.Genre,
          director: record.director,
          actors: record.Actors,
          rating: Number(record.Rating),
          votes: Number(record.Votes),
          revenue: Number(record.Revenue),
          metascore: Number(record.Metascore),
        },
      });
    } catch (error) {
      spinner.fail(`Error indexing movie ${record.Title}`);
      console.error(error);
    }
  }

  spinner.succeed("All movies indexed");
}
indexMovieData();
