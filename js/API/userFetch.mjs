import { baseUrl, profileUrl } from "../API/urls.js";
import { apiFetch } from "../utils.js";

export async function fetchUserProfile(profile) {
  try {
    const userData = await apiFetch(
      `${baseUrl}${profileUrl}/${profile}`,
      "GET"
    );
    console.log(`Displaying user: ${userData.name}`);
    return userData;
  } catch (error) {
    console.log("Error loading user:", error);
  }
}
