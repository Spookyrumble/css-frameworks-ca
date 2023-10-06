import { API_BASE_URL } from "../utils.js";
import { postFetch } from "../API/postFetch.mjs";
import { apiFetch } from "../utils.js";
import { fetchUsersPosts } from "../API/userPostFetch.mjs";
import { authorInclude, baseUrl } from "../API/urls.js";
import { loadProfile } from "./profileHandler.mjs";

const userId = localStorage.getItem("userId");
let followingData = null;

async function loadFollowingData(userId) {
  try {
    const response = await apiFetch(
      `${API_BASE_URL}/profiles/${userId}?_following=true`
    );
    const profileData = response;
    followingData = profileData.following;
  } catch (error) {
    console.error("Error loading following data:", error);
  }
}

function isFollowing(targetUsername) {
  return (
    followingData &&
    followingData.some((followingUser) => followingUser.name === targetUsername)
  );
}

// loadFollowingData();

function createPost(post) {
  const feedContainer = document.getElementById("feedContainer");

  const feedBox = document.createElement("div");
  feedBox.classList.add("row", "mb-5", "border-bottom", "p-2");

  const nameContainer = document.createElement("div");
  nameContainer.classList.add("d-flex", "w-100", "justify-content-between");

  const profileContainer = document.createElement("div");
  profileContainer.classList.add("d-flex");
  const profilePicture = document.createElement("img");
  profilePicture.classList.add("customThumbnail");
  if (
    !post.author ||
    !post.author.avatar ||
    post.author.avatar == null ||
    post.author.avatar == ""
  ) {
    profilePicture.src =
      "https://www.freeiconspng.com/uploads/profile-icon-9.png";
    profilePicture.alt = "user avatar";
    profilePicture.title = "Image from freeiconspng.com";
  } else {
    profilePicture.src = post.author.avatar;
    profilePicture.alt = "user avatar";
  }

  const nameLink = document.createElement("a");
  nameLink.href = `/profile/index.html?id=${post.author.name}`; // remember to correct this
  const nameBox = document.createElement("p");
  nameBox.classList.add("mx-2", "text-dark");
  nameBox.innerText = post.author.name;

  const followUnfollowBox = document.createElement("div");
  const followUnfollowLink = document.createElement("a");
  followUnfollowLink.href = "#";
  const smallElement = document.createElement("small");
  const spanElement = document.createElement("span");
  const follower = isFollowing(post.author.name);
  if (follower) {
    spanElement.textContent = "Unfollow";
  } else {
    spanElement.textContent = "Follow";
  }

  followUnfollowLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const targetUserName = post.author.name;
    if (spanElement.textContent === "Follow") {
      spanElement.textContent = "Unfollow";
      await apiFetch(
        `${API_BASE_URL}/profiles/${post.author.name}/follow`,
        "put",
        "body"
      );
      followingData.push({ name: targetUserName });
    } else {
      spanElement.textContent = "Follow";
      await apiFetch(
        `${API_BASE_URL}/profiles/${post.author.name}/unfollow`,
        "put",
        "body"
      );
      followingData = followingData.filter(
        (followingUser) => followingUser.name !== targetUserName
      );
    }
  });

  const titleBox = document.createElement("div");
  const titleLink = document.createElement("a");
  titleLink.href = `/profile/index.html?id=${post.id}`;
  titleLink.classList.add("text-dark");
  titleLink.style.textDecoration = "none";
  const titleText = document.createElement("p");
  titleText.classList.add("mt-2");
  titleText.innerText = post.title;

  const bodyBox = document.createElement("div");
  const bodyText = document.createElement("p");
  bodyText.innerText = post.body;

  if (!post.media == null || !post.media == "") {
    const mediaBox = document.createElement("div");
    mediaBox.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");
    const media = document.createElement("img");
    media.classList.add("img-fluid");
    media.src = post.media;
    media.alt = "post image";
    mediaBox.appendChild(media);
    feedBox.appendChild(mediaBox);
  }

  feedBox.appendChild(nameContainer);
  nameContainer.appendChild(profileContainer);
  profileContainer.appendChild(profilePicture);
  profileContainer.appendChild(nameLink);
  nameLink.appendChild(nameBox);
  nameContainer.appendChild(followUnfollowBox);
  followUnfollowBox.appendChild(followUnfollowLink);
  followUnfollowLink.appendChild(smallElement);
  smallElement.appendChild(spanElement);
  feedBox.appendChild(titleBox);
  titleLink.appendChild(titleText);
  titleBox.appendChild(titleLink);
  feedBox.appendChild(bodyBox);
  bodyBox.appendChild(bodyText);
  feedContainer.appendChild(feedBox);
}

function createPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    createPost(post);
  }
}

export async function buildFeed() {
  const postData = await postFetch();
  createPosts(postData);
}

export async function buildUserFeed(user) {
  const userPostData = await fetchUsersPosts(user);
  createPosts(userPostData);
}

export async function buildSinglePost() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const searchId = params.get("id");
  console.log(searchId);

  const postById = await apiFetch(
    `${baseUrl}/posts/${searchId}${authorInclude}`,
    "get"
  );

  //   console.log(postById);
  await loadProfile(postById.author.name);
  createPost(postById);
  loadFollowingData(postById.author.name);
}
