import { buildFeed } from "./postHandler.mjs";
import { fetchAllThePosts } from "../API/fetchAllThePosts.mjs";

export async function performSearch(searchTerm) {
  const allPosts = await fetchAllThePosts();

  // Filter based on the search term
  const filteredPosts = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().startsWith(searchTerm);
    const authorMatch = post.author.name.toLowerCase().startsWith(searchTerm);
    return titleMatch || authorMatch;
  });

  buildFeed(filteredPosts);
}
