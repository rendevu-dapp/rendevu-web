import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // privy
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
    PRIVY_CLIENT_ID: process.env.PRIVY_CLIENT_ID,
    // thirdweb
    THIRDWEB_SECRET: process.env.THIRDWEB_SECRET,
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    // backend
    BACKEND_URL: process.env.BACKEND_URL,
    SUBGRAPH_ENDPOINT: process.env.SUBGRAPH_ENDPOINT,
    // contracts
    EVENT_PLATFORM_CONTRACT_ADDRESS:
      process.env.EVENT_PLATFORM_CONTRACT_ADDRESS,
    // google
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    // typesense
    TYPESENSE_URL: process.env.TYPESENSE_URL,
    TYPESENSE_ADMIN_API_KEY: process.env.TYPESENSE_ADMIN_API_KEY,
    TYPESENSE_SEARCH_ONLY_API_KEY: process.env.TYPESENSE_SEARCH_ONLY_API_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "heroui.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    reactCompiler: true,
    serverMinification: false, // change to true for production / false for development to see meaningful error messages
  },

  turbopack: {
    rules: {
      ".graphql": {
        loaders: ["graphql-tag/loader"],
      },
      ".gql": {
        loaders: ["graphql-tag/loader"],
      },
    },
  },
};

export default nextConfig;
