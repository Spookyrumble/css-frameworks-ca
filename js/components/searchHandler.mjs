import { postFetch } from "../API/postFetch.mjs";
import { buildFeed } from "./postHandler.mjs";

export async function performSearch(searchTerm) {
  const allPosts = await postFetch();

  // Filter based on the search term
  const filteredPosts = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().startsWith(searchTerm);
    const authorMatch = post.author.name.toLowerCase().startsWith(searchTerm);
    return titleMatch || authorMatch;
  });

  buildFeed(filteredPosts);
}
