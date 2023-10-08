import { apiFetch } from "../utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

export function deletePost(postId) {
  const userPrompt = window.confirm(
    "Are you sure you want to delete this post? This action can not be undone."
  );
  if (userPrompt === true) {
    try {
      const response = apiFetch(`${baseUrl}${postUrl}/${postId}`, "DELETE");
      console.log("Post deleted:", response);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  } else {
    console.log("Post deletion cancelled.");
    return false;
  }
}
