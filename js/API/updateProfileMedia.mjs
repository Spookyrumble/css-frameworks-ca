import { apiFetch } from "./utils/utils.js";
import { baseUrl, profileUrl } from "./urls.js";

export async function updateUserMedia(userId, object) {
  try {
    const response = await apiFetch(
      `${baseUrl}${profileUrl}/${userId}/media`,
      "PUT",
      object
    );
    return response;
  } catch (error) {
    console.error("Error updating user media:", error);
  }
}
