import { baseUrl, postUrl, authorInclude } from "../API/urls.js";
import { apiFetch } from "./utils/utils.js";

/**
 * Fetches all posts from the API with author info included (default 100 posts)
 * @returns array of posts
 */
export async function postFetch() {
  try {
    const postArray = await apiFetch(
      `${baseUrl}${postUrl}${authorInclude}&_comments=true&_reactions=true`,
      "GET"
    );
    return postArray;
  } catch (error) {
    console.log("Error loading posts:", error);
  }
}
