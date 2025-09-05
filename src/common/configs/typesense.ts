// imports
import Typesense from "typesense";

const TYPESENSE_URL = process.env.TYPESENSE_URL;
const TYPESENSE_ADMIN_API_KEY = process.env.TYPESENSE_ADMIN_API_KEY;
const TYPESENSE_SEARCH_ONLY_API_KEY = process.env.TYPESENSE_SEARCH_ONLY_API_KEY;

if (
  !TYPESENSE_URL ||
  !TYPESENSE_ADMIN_API_KEY ||
  !TYPESENSE_SEARCH_ONLY_API_KEY
) {
  throw new Error("Missing Typesense environment variables");
}

/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than an admin API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */
export const typesense = ({ isServer = false } = {}) =>
  new Typesense.SearchClient({
    apiKey: isServer
      ? process.env.TYPESENSE_ADMIN_API_KEY!
      : process.env.TYPESENSE_SEARCH_ONLY_API_KEY!,
    nodes: [
      {
        url: process.env.TYPESENSE_URL!,
      },
    ],
    connectionTimeoutSeconds: 5,
  });
