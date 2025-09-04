// helpers
import { createApiClient } from "@/common/helpers";

// constants
const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  throw new Error("BACKEND_URL is not defined");
}

export const apiClient = createApiClient(backendUrl);

export const appClient = createApiClient("/api");
