import { fetchUserProfile } from "../API/userFetch.mjs";

/**
 * Populates the profile page with a user's data.
 *
 * This function is responsible for updating various elements on a profile page with
 * the details of a specified user. It updates elements such as the profile banner, user's name,
 * avatar, post count, follower count, and the count of users the profile owner is following.
 *
 * The function assumes certain elements exist in the DOM with specific IDs to inject
 * the user's data into them. If the user does not have a specified avatar, a default
 * placeholder image is used.
 *
 * @param {Object} user - The user object containing profile details.
 * @param {string} user.name - The name of the user.
 * @param {string} [user.banner] - The URL of the user's banner image.
 * @param {string} [user.avatar] - The URL of the user's avatar image.
 * @param {Object} user._count - An object containing count data for posts, followers, and following.
 * @param {number} user._count.posts - The number of posts by the user.
 * @param {number} user._count.followers - The number of followers of the user.
 * @param {number} user._count.following - The number of users the main user is following.
 *
 * @example
 * const userData = {
 *   name: "John Doe",
 *   banner: "https://example.com/banner.jpg",
 *   avatar: "https://example.com/avatar.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 20,
 *     following: 30
 *   }
 * };
 * populateProfile(userData);
 */
export function populateProfile(user) {
  const userBanner = document.getElementById("dynamicProfileTitle");
  userBanner.innerText = `${user.name}'s profile page`;

  if (user.banner && user.banner.trim() !== "") {
    userBanner.classList.add("p-5", "my-1", "text-shadow-white");
    userBanner.style.backgroundImage = `url(${user.banner})`;
    userBanner.style.backgroundSize = "cover";
    userBanner.style.backgroundPosition = "center";
    userBanner.style.backgroundRepeat = "no-repeat";
  }

  const userName = document.getElementById("nameContainer");
  userName.innerText = user.name;

  const userAvatarContainer = document.getElementById("imageContainer");
  const userAvatar = document.createElement("img");
  if (user.avatar) {
    userAvatar.src = user.avatar;
  } else {
    userAvatar.src = "https://www.freeiconspng.com/uploads/profile-icon-9.png";
  }
  userAvatarContainer.appendChild(userAvatar);

  const postCounter = document.getElementById("postCounter");
  const postCount = user._count.posts;
  postCounter.innerText = `${postCount}`;

  const followerCounter = document.getElementById("followerCounter");
  const followCount = user._count.followers;
  followerCounter.innerText = `${followCount}`;

  const followingCounter = document.getElementById("followingCounter");
  const followingCount = user._count.following;
  followingCounter.innerText = `${followingCount}`;
}

/**
 * Loads and populates a user profile based on the provided user ID.
 *
 * Dependencies:
 * - Depends on the `fetchUserProfile` function to retrieve the user's profile data.
 * - Depends on the `populateProfile` function to populate and render the profile data on the UI.
 *
 * @param {string|number} userId - The unique identifier of the user whose profile needs to be loaded.
 * @returns {Promise<void>} A Promise that resolves when the user profile has been loaded and rendered.
 *
 * @throws Will throw an error if the profile data cannot be fetched.
 *
 * @example
 * await loadProfile("12345");  // Loads and populates the profile of user with ID 12345.
 */
export async function loadProfile(userId) {
  const user = await fetchUserProfile(userId);
  console.log(user);
  populateProfile(user);
}
