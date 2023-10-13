import { apiFetch } from "../API/utils/utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

/**
 * Deletes a post by its ID after confirming with the user.
 * If the user confirms, sends a DELETE request to remove the post.
 * Logs the deletion process to the console and returns a boolean
 * value based on the user's decision.
 *
 * @function deletePost
 * @param {number|string} postId - The ID of the post to be deleted.
 * @returns {boolean} Returns `true` if the post was deleted, `false` if the deletion was cancelled.
 *
 * @example
 *
 * // Attempt to delete a post with the ID of 5.
 * const wasDeleted = deletePost(5);
 * if (wasDeleted) {
 *     console.log("The post was successfully deleted.");
 * } else {
 *     console.log("Post deletion was cancelled.");
 * }
 */
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
