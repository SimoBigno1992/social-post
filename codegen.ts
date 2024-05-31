
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://gorest.co.in/graphql/schema.graphql",
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    "src/utils/graphql/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations", 
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true
      }
    }
  }
};

export default config;
