import { fetchUserProfile } from "../API/userFetch.mjs";

export function populateProfile(user) {
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
  console.log(postCount);

  const followerCounter = document.getElementById("followerCounter");
  const followCount = user._count.followers;
  followerCounter.innerText = `${followCount}`;
  console.log(followCount);

  const followingCounter = document.getElementById("followingCounter");
  const followingCount = user._count.following;
  followingCounter.innerText = `${followingCount}`;
  console.log(followingCount);
}

export async function loadProfile(userId) {
  const user = await fetchUserProfile(userId);
  console.log(user);
  populateProfile(user);
}
