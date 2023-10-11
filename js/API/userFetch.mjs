import { baseUrl, profileUrl } from "../API/urls.js";
import { apiFetch } from "../utils.js";

/**
 * Fetches the user profile data from the API.
 *
 * @async
 * @function fetchUserProfile
 * @param {string} profile - The profile identifier (could be a user ID or username).
 * @returns {Promise<Object>} Returns a promise that resolves to the user profile data.
 * @throws Will log an error if the fetch operation fails.
 *
 * @example
 *
 * try {
 *   const userProfile = await fetchUserProfile("johnDoe123");
 *   console.log(userProfile.name); // logs the name of the user, for example: "John Doe"
 * } catch (error) {
 *   console.error("There was an error fetching the user profile:", error);
 * }
 */
export async function fetchUserProfile(profile) {
  try {
    const userData = await apiFetch(
      `${baseUrl}${profileUrl}/${profile}`,
      "GET"
    );
    return userData;
  } catch (error) {
    console.log("Error loading user:", error);
  }
}
