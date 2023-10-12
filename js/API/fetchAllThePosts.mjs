import { apiFetch } from "../utils.js";
import { baseUrl, postUrl } from "./urls.js";

/**
 * Fetches all posts from the API in paginated fashion.
 *
 * This function retrieves posts in chunks (based on a defined limit) and will
 * continue to fetch until all available posts are retrieved.
 *
 * @async
 * @function
 * @returns {Array<Object>} Returns an array of all posts from the server.
 *
 * @example
 *
 * async function exampleUsage() {
 *     const allPosts = await fetchAllThePosts();
 *     console.log(allPosts);
 * }
 *
 * exampleUsage();
 */
export async function fetchAllThePosts() {
  let allPostsArray = [];
  const limit = 100;
  let offset = 0;

  while (true) {
    const response = await apiFetch(
      `${baseUrl}${postUrl}?limit=${limit}&offset=${offset}&_author=true&sort=created&_comments=true&_reactions=true`,
      "GET"
    );

    const posts = await response;

    if (posts.length === 0 || posts.length < limit) {
      allPostsArray = [...allPostsArray, ...posts];
      break;
    }

    allPostsArray = [...allPostsArray, ...posts];
    offset += limit;
  }

  return allPostsArray;
}
