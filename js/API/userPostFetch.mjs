import { baseUrl, profileUrl, postUrl } from "../API/urls.js";
import { apiFetch } from "../utils.js";

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
