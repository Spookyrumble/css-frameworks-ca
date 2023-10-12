import { baseUrl, postUrl } from "../API/urls.js";

/**
 * Posts a like reaction to a specific post.
 *
 * @async
 * @function postLikeReaction
 * @param {string} postId - The ID of the post to react to.
 * @returns {Promise<Response>} - The response object representing the server's response to the request.
 */
export async function postLikeReaction(postId) {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${baseUrl}${postUrl}/${postId}/react/❤️`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}
