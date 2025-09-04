"use client";

// imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";

// env variables
const subGraphEndpoint = process.env.SUBGRAPH_ENDPOINT;

if (!subGraphEndpoint) {
  throw new Error("SUB_GRAPH_ENDPOINT is not defined");
}

// config
const client = new ApolloClient({
  uri: subGraphEndpoint,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
