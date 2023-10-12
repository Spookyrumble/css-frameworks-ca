import { baseUrl, postUrl } from "../API/urls.js";

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
