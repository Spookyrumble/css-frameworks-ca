import { buildFeed } from "./postHandler.mjs";
import { fetchAllThePosts } from "../API/fetchAllThePosts.mjs";

/**
 * Performs a search on all posts based on a provided search term.
 *
 * This function fetches all posts and then filters the results based on whether the search term
 * matches the start of a post's title or the post author's name. After filtering, the results are
 * displayed using the `buildFeed` function.
 *
 * Both the post's title and author's name are checked in a case-insensitive manner.
 *
 * @param {string} searchTerm - The term to search for in posts' titles and authors' names.
 * @returns {Promise<void>} - A promise that resolves once the search is completed and results are displayed.
 *
 * @example
 * performSearch('john').then(() => {
 *   console.log('Search completed!');
 * });
 */
export async function performSearch(searchTerm) {
  const allPosts = await fetchAllThePosts(); //Don't understand the highlighted "await" here. It will not work without it.

  // Filter based on the search term
  const filteredPosts = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const authorMatch = post.author.name.toLowerCase().startsWith(searchTerm);
    return titleMatch || authorMatch;
  });

  buildFeed(filteredPosts);
}
