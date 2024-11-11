
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
const BASE_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";

export async function getResources(path: string, query?: Record<string, string>) {
  const urlPath = "/api/" + path;
  const url = new URL(urlPath, BASE_URL);
  if (query) url.search = qs.stringify(query);
  const response = await fetchAPI(url.href, { method: "GET" });
  return response;
}
