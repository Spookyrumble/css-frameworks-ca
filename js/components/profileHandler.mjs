import { fetchUserProfile } from "../API/userFetch.mjs";
import { updateUserMedia } from "../API/updateProfileMedia.mjs";

/**
 * Populates the user profile with the given user data.
 *
 * This function updates various UI elements such as the user's banner,
 * name, avatar, post count, follower count, and following count. It also
 * sets event listeners to handle profile editing for the logged-in user.
 *
 * @function
 * @param {Object} user - The user data object.
 * @param {string} user.name - The name of the user.
 * @param {string} [user.banner] - The URL of the user's banner image. Optional.
 * @param {string} [user.avatar] - The URL of the user's avatar image. Optional.
 * @param {Object} user._count - Object containing counts of user's activities.
 * @param {number} user._count.posts - The count of user's posts.
 * @param {number} user._count.followers - The count of user's followers.
 * @param {number} user._count.following - The count of users that the user is following.
 *
 * @example
 * const userData = {
 *   name: "John Doe",
 *   banner: "https://example.com/banner.jpg",
 *   avatar: "https://example.com/avatar.jpg",
 *   _count: {
 *     posts: 10,
 *     followers: 200,
 *     following: 150
 *   }
 * };
 * populateProfile(userData);
 */
export function populateProfile(user) {
  const userBanner = document.getElementById("dynamicProfileTitle");
  const userFeedTitle = document.getElementById("dynamicFeedTitle");
  userBanner.innerText = `${user.name}'s profile page`;
  userFeedTitle.innerText = `${user.name}'s posts`;

  if (user.banner && user.banner.trim() !== "") {
    userBanner.classList.add("p-5", "my-1", "text-shadow-white");
    userBanner.style.backgroundImage = `url(${user.banner})`;
    userBanner.style.backgroundSize = "cover";
    userBanner.style.backgroundPosition = "center";
    userBanner.style.backgroundRepeat = "no-repeat";
  }

  const userName = document.getElementById("nameContainer");
  userName.innerText = user.name;

  const loggedInUser = localStorage.getItem("userId");
  if (user.name === loggedInUser) {
    const editProfile = document.getElementById("editProfile");
    const editContainer = document.getElementById("editContainer");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const avatarUrl = document.getElementById("avatar");
    const bannerUrl = document.getElementById("banner");

    editProfile.classList.remove("d-none");

    editProfile.addEventListener("click", function (e) {
      e.preventDefault();
      editContainer.classList.toggle("d-none");
      avatarUrl.placeholder = user.avatar;
      bannerUrl.placeholder = user.banner;
    });

    cancelBtn.addEventListener("click", function (e) {
      e.preventDefault();
      editContainer.classList.add("d-none");
    });

    saveBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      // https://spookyrumble-portfolio.netlify.app/images/avatar_sefie.png
      // https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80

      let newProfileMedia = {};

      if (avatarUrl.value !== "") {
        newProfileMedia.avatar = avatarUrl.value;
      }
      if (bannerUrl.value !== "") {
        newProfileMedia.banner = bannerUrl.value;
      }
      if (Object.keys(newProfileMedia).length > 0) {
        await updateUserMedia(loggedInUser, newProfileMedia);
        editContainer.classList.add("d-none");
        window.location.reload();
      } else {
        alert("No changes made");
      }
    });
  }

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
  populateProfile(user);
}
