import { apiFetch } from "../utils.js";
import { buildFeed } from "./postHandler.mjs";
import {
  baseUrl,
  postUrl,
  followingInclude,
  profileUrl,
  authorInclude,
} from "../API/urls.js";

const userId = localStorage.getItem("userId");

export async function feedFilter() {
  const dropdownFilter = document.getElementById("sortBy");

  dropdownFilter.addEventListener("change", async () => {
    const value = dropdownFilter.value;

    try {
      const posts = await apiFetch(
        `${baseUrl}${profileUrl}/${userId}${followingInclude}`,
        "GET"
      );

      const allPosts = await apiFetch(
        `${baseUrl}${postUrl}${authorInclude}`,
        "GET"
      );

      let sortedArray = [];
      switch (value) {
        case "Newest":
          sortedArray = [...allPosts].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          buildFeed(sortedArray);
          break;
        case "Oldest":
          sortedArray = [...allPosts].sort(
            (a, b) => new Date(a.created) - new Date(b.created)
          );
          buildFeed(sortedArray);
          break;
        case "Friends":
          const friendNames = posts.following.map((friend) => friend.name);
          sortedArray = allPosts.filter((post) =>
            friendNames.includes(post.author.name)
          );
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
