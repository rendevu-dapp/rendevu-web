// node

import { exec } from "child_process";
// imports
import { config as dotenvConfig } from "dotenv";
import { writeFileSync } from "fs";

dotenvConfig();

const url = process.env.SUBGRAPH_ENDPOINT;

if (!url) {
  console.error("Please provide a GraphQL URL");
}

exec(`npx get-graphql-schema ${url}`, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }

  // Write the output to a file - schema.graphql
  writeFileSync("schema.graphql", stdout, { encoding: "utf-8" });

  process.exit(0);
});
