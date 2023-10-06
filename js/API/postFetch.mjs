import { baseUrl, postUrl, authorInclude } from "../API/urls.js";
import { apiFetch } from "../utils.js";

/**
 * Fetches all posts from the API with author info included (default 100 posts)
 * @returns array of posts
 */
export async function postFetch() {
  try {
    const postArray = await apiFetch(
      `${baseUrl}${postUrl}${authorInclude}`,
      "GET"
    );
    console.log(postArray);
    return postArray;
  } catch (error) {
    console.log("Error loading posts:", error);
  }
}
// async function fetchUserPosts(url) {
//   try {
//     const response = await apiFetch(url);
//     const postData = response;
//     console.log(postData);
//     return postData;
//   } catch (error) {
//     console.error("Error loading user posts:", error);
//   }
// }
