import { apiFetch } from "../API/utils/utils.js";
import { buildFeed } from "./postHandler.mjs";
import {
  baseUrl,
  postUrl,
  followingInclude,
  profileUrl,
  authorInclude,
} from "../API/urls.js";
import { fetchAllThePosts } from "../API/fetchAllThePosts.mjs";

const userId = localStorage.getItem("userId");
const loader = document.querySelector(".loader");

/**
 * Sets up an event listener on a dropdown filter to sort and display posts based on the selected filter.
 * When the dropdown's value changes, this function fetches and filters posts according to the chosen criterion.
 * The potential filtering options include:
 * - "Newest": Sorting posts from the newest to the oldest.
 * - "Oldest": Sorting posts from the oldest to the newest.
 * - "Friends": Displaying only posts authored by friends.
 * If no specific filter is chosen or an unknown filter value is encountered, all posts are shown.
 * After fetching and processing, the feed is populated using the `buildFeed` function.
 *
 * Dependencies:
 * - Relies on global variables and external functions: `apiFetch`, `baseUrl`, `profileUrl`, `postUrl`, `followingInclude`, `authorInclude`, and `buildFeed`.
 *
 * @async
 * @example
 * await feedFilter(); // Activates the filter functionality on the dropdown and waits for user interactions.
 */
export async function feedFilter() {
  const dropdownFilter = document.getElementById("sortBy");
  dropdownFilter.addEventListener("change", async () => {
    const value = dropdownFilter.value;
    loader.classList.remove("d-none");

    try {
      const posts = await apiFetch(
        `${baseUrl}${profileUrl}/${userId}${followingInclude}&_comments=true&_reactions=true`,
        "GET"
      );
      const allPosts = await fetchAllThePosts();
      const newestPosts = await apiFetch(
        `${baseUrl}${postUrl}${authorInclude}&_comments=true&_reactions=true`,
        "GET"
      );
      let sortedArray = [];
      switch (value) {
        case "Newest":
          sortedArray = [...newestPosts].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          loader.classList.remove("d-none");
          buildFeed(sortedArray);
          break;
        case "Oldest":
          sortedArray = [...newestPosts].sort(
            (a, b) => new Date(a.created) - new Date(b.created)
          );
          loader.classList.remove("d-none");
          buildFeed(sortedArray);
          break;
        case "Friends":
          const friendNames = posts.following.map((friend) => friend.name);
          console.log(friendNames);
          sortedArray = allPosts.filter((post) =>
            friendNames.includes(post.author.name)
          );
          loader.classList.remove("d-none");
          buildFeed(sortedArray);
          break;
        default:
          sortedArray = allPosts;
          buildFeed(sortedArray);
      }
    } catch (error) {
      console.error("Error fetching or processing posts:", error);
    }
  });
  buildFeed();
}
