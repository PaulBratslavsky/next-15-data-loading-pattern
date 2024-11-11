
import qs from "qs";
import { fetchAPI } from "@/lib/fetch-api";
const BASE_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";

export async function getResources() {
  const path = "/api/resources";
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    fields: ["content", "type"],
  });
  const response = await fetchAPI(url.href, { method: "GET" });
  return response;
}
