import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";

dotenvConfig(); // Load environment variables from .env file

const config: CodegenConfig = {
  // Overwrite existing files (keep this unless you want to preserve manual changes)
  overwrite: true,

  // Schema source (unchanged, assuming it’s at project root)
  schema: process.env.SUBGRAPH_ENDPOINT,

  // Documents glob (unchanged, but ensure it matches your structure)
  documents: "src/common/graphql/**/*.graphql",

  // Ignore errors if no documents exist (optional, prevents failures in early dev)
  ignoreNoDocuments: true,

  generates: {
    // Frontend client types (using 'client' preset)
    "src/common/graphql/generated/": {
      preset: "client",
      presetConfig: {
        // Ensure fragment masking is enabled (improves type safety)
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
        // Use const enums for better performance in TypeScript
        useConstEnums: true,
      },
      // No plugins needed with 'client' preset; it includes typescript, operations, etc.
    },

    // Type declarations for .graphql files
    "src/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
      config: {
        // Ensure module paths are relative to the project root
        // modulePathPrefix: "src/common/graphql/",
      },
    },
  },

  // Optional: Add hooks for post-generation tasks (e.g., linting)
  // ONLY ENABLE IF PRETTIER IS INSTALLED GLOBALLY AS A CLI COMMAND ON SYSTEM
  // hooks: {
  //   afterAllFileWrite: ["prettier --write"],
  // },
};

export default config;
