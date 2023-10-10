import { apiFetch } from "../utils.js";
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

export async function feedFilter() {
  const dropdownFilter = document.getElementById("sortBy");

  dropdownFilter.addEventListener("change", async () => {
    const value = dropdownFilter.value;
    loader.classList.remove("d-none");

    try {
      const posts = await apiFetch(
        `${baseUrl}${profileUrl}/${userId}${followingInclude}`,
        "GET"
      );

      const allPosts = await fetchAllThePosts();
      // console.log(allPosts);

      const newestPosts = await apiFetch(
        `${baseUrl}${postUrl}${authorInclude}`,
        "GET"
      );

      const friendPosts = await apiFetch(
        `${baseUrl}${postUrl}/following${authorInclude}`,
        "GET"
      );
      // console.log(friendPosts);

      let sortedArray = [];
      switch (value) {
        case "Newest":
          sortedArray = [...newestPosts].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );

          buildFeed(sortedArray);
          break;
        case "Oldest":
          sortedArray = [...newestPosts].sort(
            (a, b) => new Date(a.created) - new Date(b.created)
          );
          buildFeed(sortedArray);
          break;
        case "Friends":
          // sortedArray = [...friendPosts];
          // buildFeed(sortedArray);

          // Extract list of friend names
          const friendNames = posts.following.map((friend) => friend.name);
          console.log(friendNames);

          // Filter posts written by friends
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
