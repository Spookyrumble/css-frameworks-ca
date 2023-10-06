import { fetchUserProfile } from "../API/userFetch.mjs";

export function populateProfile(user) {
  const userName = document.getElementById("nameContainer");
  const profileFollowBtn = document.getElementById("profileFollowBtn");
  if (user.name === localStorage.getItem("userId")) {
    profileFollowBtn.setAttribute("hidden", true);
  }

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

export async function loadProfile(userId) {
  const user = await fetchUserProfile(userId);
  console.log(user);
  populateProfile(user);
}
