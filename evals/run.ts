/**
 * Evaluation Runner Script
 *
 * This module serves as the entry point for running AI agent evaluations.
 * It can run a specific evaluation or all evaluations in the experiments directory.
 */

// Load environment variables from .env file
import "dotenv/config";
// File system operations for reading directories
import { readdir } from "fs/promises";
// Path manipulation utilities
import { dirname, join } from "path";
// Convert file URL to file path for ES modules compatibility
import { fileURLToPath } from "url";

/**
 * Current file path (ES modules equivalent of __filename)
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Current directory path (ES modules equivalent of __dirname)
 */
const __dirname = join(__filename, "..");

/**
 * Main execution function for running evaluations
 *
 * Parses command line arguments and runs either a specific evaluation
 * or all evaluations in the experiments directory.
 *
 * @async
 */
const main = async () => {
  /**
   * Name of the evaluation to run from command line arguments
   */
  const evalName = process.argv[2];

  /**
   * Path to the directory containing evaluation experiments
   */
  const experimentDir = join(__dirname, "experiments");

  try {
    if (evalName) {
      // Run a specific evaluation based on the provided name
      const evalPath = join(experimentDir, `${evalName}.eval.ts`);
      // Convert to file URL format for ESM imports
      const evalUrl = new URL(`file://${evalPath}`).href;
      await import(evalUrl);
    } else {
      // Run all evaluations if no specific name is provided
      // Read all files in the experiments directory
      const files = await readdir(experimentDir);

      // Filter for evaluation files (ending with .eval.ts)
      const evalFiles = files.filter((file) => file.endsWith(".eval.ts"));

      // Import and run each evaluation file
      for (const evalFile of evalFiles) {
        const evalPath = join(experimentDir, evalFile);
        // Convert to file URL format for ESM imports
        const evalUrl = new URL(`file://${evalPath}`).href;
        await import(evalUrl);
      }
    }
  } catch (error) {
    // Handle errors and provide meaningful error messages
    console.error(
      `Failed to run eval${evalName ? ` '${evalName}'` : "s"}:`,
      error
    );
    // Exit with error code
    process.exit(1);
  }
};

// Execute the main function
main();
