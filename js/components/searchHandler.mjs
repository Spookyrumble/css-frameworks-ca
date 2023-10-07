import { apiFetch } from "../utils.js";
import { createPosts } from "./postHandler.mjs";
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
  //   console.log({ dropdownFilter });

  dropdownFilter.addEventListener("change", async () => {
    const value = dropdownFilter.value;
    console.log({ value });

    try {
      const posts = await apiFetch(
        `${baseUrl}${profileUrl}/${userId}${followingInclude}`,
        "GET"
      ); // Fetch posts using async/await

      // Now fetch all the posts
      const allPosts = await apiFetch(
        `${baseUrl}${postUrl}${authorInclude}`,
        "GET"
      );

      let sortedArray;
      switch (value) {
        case "All":
          sortedArray = allPosts;
          break;
        case "Newest":
          sortedArray = [...posts].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          break;
        case "Oldest":
          sortedArray = [...posts].sort(
            (a, b) => new Date(a.created) - new Date(b.created)
          );
          break;

        case "Friends":
          // Extract list of friend names
          const friendNames = posts.following.map((friend) => friend.name);

          // Filter posts written by friends
          sortedArray = allPosts.filter((post) =>
            friendNames.includes(post.author.name)
          );

          break;
        default:
          sortedArray = allPosts; // Defaulting to the original list in case no match is found
      }
      console.log({ sortedArray });
      resolve(sortedArray);
    } catch (error) {
      console.error("Error fetching or processing posts:", error);
      resolve([]);
    }
  });
}
//     let sortedArray = apiFetch(`${baseUrl}${postUrl}${authorInclude}`, "GET");

//     switch (value) {
//       case "all":
//         sortedArray = posts;
//         break;
//       case "newest":
//         sortedArray = [...posts].sort((a, b) => {
//           new Date(b.created) - new Date(a.created);
//         });
//         break;
//       case "oldest":
//         sortedArray = [...posts].sort((a, b) => {
//           new Date(a.created) - new Date(b.created);
//         });
//         break;
//       case "friends":
//         sortedArray = posts.filter((item) => item._count.following);
//         break;
//     }
//     createPosts(sortedArray);
//   });
// }
// sortedArray.sort((a, b) => new Date(b.created) - new Date(a.created));
// console.log(sortedArray);

// sortedArray = [...posts].sort((a, b) => {
//   return new Date(b.created).getTime() - new Date(a.created).getTime();
// });
// console.log("Original first post:", posts[0]);
// console.log("Sorted first post:", sortedArray[0]);
