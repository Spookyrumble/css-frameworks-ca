import { apiFetch } from "../utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

export async function postComment(postId, comment) {
  try {
    const response = await apiFetch(
      `${baseUrl}${postUrl}/${postId}/comment`,
      "POST",
      comment
    );
    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}
