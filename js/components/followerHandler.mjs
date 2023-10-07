// import { apiFetch } from "../utils.js";
// import { baseUrl, profileUrl } from "../API/urls.js";

// const userId = localStorage.getItem("userId");
// let followingData = null;

// async function loadFollowingData() {
//   try {
//     const response = await apiFetch(
//       `${baseUrl}${profileUrl}/${userId}?_following=true`
//     );
//     const profileData = response;
//     followingData = profileData.following;
//   } catch (error) {
//     console.error("Error loading following data:", error);
//   }
// }

// function isFollowing(targetUsername) {
//   return (
//     followingData &&
//     followingData.some((followingUser) => followingUser.name === targetUsername)
//   );
// }

// export { loadFollowingData, isFollowing };
