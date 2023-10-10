import { baseUrl, profileUrl, postUrl } from "../API/urls.js";
import { apiFetch } from "../utils.js";

/**
 * Fetches the posts of a specific user from the API.
 *
 * @async
 * @function fetchUsersPosts
 * @param {string} profileToFetchPostsFrom - The profile identifier (could be a user ID or username) to fetch posts from.
 * @returns {Promise<Array<Object>>} Returns a promise that resolves to an array of user posts.
 * @throws Will log an error if the fetch operation fails.
 *
 * @example
 *
 * try {
 *   const userPosts = await fetchUsersPosts("johnDoe123");
 *   console.log(userPosts); // logs an array of posts by user "johnDoe123"
 * } catch (error) {
 *   console.error("There was an error fetching the user's posts:", error);
 * }
 */
export async function fetchUsersPosts(profileToFetchPostsFrom) {
  try {
    const response = await apiFetch(
      `${baseUrl}${profileUrl}/${profileToFetchPostsFrom}${postUrl}?_author=true`
    );
    const userPosts = response;
    console.log(userPosts);
    return userPosts;
  } catch (error) {
    console.error("Error loading user posts:", error);
  }
}
