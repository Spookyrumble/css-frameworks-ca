import { postFetch } from "../API/postFetch.mjs";
import { apiFetch } from "../API/utils/utils.js";
import { fetchUsersPosts } from "../API/userPostFetch.mjs";
import { authorInclude, baseUrl, profileUrl } from "../API/urls.js";
import { loadProfile } from "./profileHandler.mjs";
import { deletePost } from "./deleteHandler.mjs";
import { showModal } from "./editPostHandler.mjs";
import { formatDate } from "../API/utils/utils.js";
import { postComment } from "../API/postComment.mjs";
import { postLikeReaction } from "../API/postReaction.mjs";

const userId = localStorage.getItem("userId");
let followingData = null;

/**
 * Asynchronously fetches and loads the list of users being followed by the currently logged-in user.
 *
 * This function retrieves the profiles of users that the logged-in user is following and updates
 * the global `followingData` array with this list. If an error occurs during the fetch, the error
 * will be logged to the console.
 *
 * Dependencies:
 * - Relies on the global `followingData` array to store the list of users.
 * - Utilizes the `apiFetch` function for API interactions.
 *
 * @returns {Promise<void>} A promise that resolves when the data has been loaded, but returns no value.
 *
 * @example
 * loadFollowingData()
 *   .then(() => {
 *     console.log('Following data loaded successfully.');
 *   })
 *   .catch(err => {
 *     console.error('Failed to load following data:', err);
 *   });
 */
async function loadFollowingData() {
  try {
    const response = await apiFetch(
      `${baseUrl}${profileUrl}/${userId}?_following=true`
    );
    const profileData = response;
    followingData = profileData.following;
  } catch (error) {
    console.error("Error loading following data:", error);
  }
}

/**
 * Determines if the currently logged-in user is following the target user.
 *
 * This function checks the global `followingData` array to determine if
 * the target user is among those being followed by the currently logged-in user.
 *
 * Dependencies:
 * - Depends on the global `followingData` array.
 *
 * @param {string} targetUsername - The username of the target user to check against.
 * @returns {boolean} Returns true if the logged-in user is following the target user, otherwise false.
 *
 * @example
 * const result = isFollowing('JaneDoe');
 * if (result) {
 *   console.log('The logged-in user is following JaneDoe.');
 * } else {
 *   console.log('The logged-in user is not following JaneDoe.');
 * }
 */
function isFollowing(targetUsername) {
  return (
    followingData &&
    followingData.some((followingUser) => followingUser.name === targetUsername)
  );
}

loadFollowingData();

const feedContainer = document.getElementById("feedContainer");
const loader = document.querySelector(".loader");

/**
 * Creates and renders a single post element based on provided post data.
 *
 * This function creates a DOM structure for a post that includes the author's avatar,
 * name, post title, post body, and associated media. It also provides functionality
 * for following or unfollowing the post's author, and for editing and deleting the post
 * if the logged-in user is the post's author.
 *
 * Dependencies:
 * - Depends on several global variables and functions including but not limited to
 *   `loader`, `feedContainer`, `isFollowing`, `showModal`, `deletePost`, and `apiFetch`.
 *
 * @param {Object} post - A single post data object.
 * @param {Object} post.author - The author of the post.
 * @param {string} post.author.name - The name of the post author.
 * @param {string} post.author.avatar - The avatar URL of the post author.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {string} [post.media] - The media URL associated with the post.
 *
 * @throws Will throw an error if there's an issue creating or appending any of the post elements.
 *
 * @example
 * const postData = {
 *   author: { name: 'JohnDoe', avatar: 'https://example.com/john.jpg' },
 *   id: '1234',
 *   title: 'Sample Post',
 *   body: 'This is a sample post body.',
 *   media: 'https://example.com/image.jpg'
 * };
 * createPost(postData);  // Renders the post.
 */
function createPost(post) {
  loader.classList.add("d-none");
  const feedBox = document.createElement("div");
  feedBox.classList.add(
    "d-flex",
    "gap-1",
    "row",
    "p-2",
    "m-auto",
    "my-5",
    "border",
    "shadow"
  );

  const nameContainer = document.createElement("div");
  nameContainer.classList.add(
    "d-flex",
    "w-100",
    "justify-content-between",
    "flex-wrap"
  );

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
  nameLink.href = `/profile/index.html?id=${post.author.name}`;
  const nameBox = document.createElement("p");
  nameBox.classList.add("mx-2", "text-dark", "fs-4");
  nameBox.innerText = post.author.name;

  const followUnfollowBox = document.createElement("div");
  followUnfollowBox.classList.add("d-flex", "gap-3", "text-end");
  const followUnfollowLink = document.createElement("a");
  followUnfollowLink.classList.add("clickableLink");
  const smallElement = document.createElement("small");
  const spanElement = document.createElement("span");
  const follower = isFollowing(post.author.name);
  if (follower) {
    spanElement.textContent = "Unfollow";
  } else {
    spanElement.textContent = "Follow";
  }
  if (post.author.name === localStorage.getItem("userId")) {
    followUnfollowLink.style.display = "none";
    const editBtn = document.createElement("a");
    editBtn.innerText = "Edit";
    editBtn.id = "showModalBtn";
    editBtn.classList.add("my-1", "clickableLink");
    followUnfollowBox.appendChild(editBtn);
    const deleteBtn = document.createElement("a");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("my-1", "clickableLink");
    followUnfollowBox.appendChild(deleteBtn);

    editBtn.addEventListener("click", () => {
      showModal(post.id, post.title, post.body, post.media);
    });
    deleteBtn.addEventListener("click", () => {
      const deleted = deletePost(post.id);
      if (deleted) {
        feedBox.remove();
      }
    });
  }

  followUnfollowLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const targetUserName = post.author.name;
    if (spanElement.textContent === "Follow") {
      spanElement.textContent = "Unfollow";
      await apiFetch(
        `${baseUrl}/profiles/${post.author.name}/follow`,
        "put",
        "body"
      );
      followingData.push({ name: targetUserName });
    } else {
      spanElement.textContent = "Follow";
      await apiFetch(
        `${baseUrl}/profiles/${post.author.name}/unfollow`,
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
  titleLink.classList.add("text-dark", "fw-bold", "fs-6");
  titleLink.style.textDecoration = "none";
  const titleText = document.createElement("p");
  titleText.classList.add("mt-2");
  titleText.innerText = post.title;

  const bodyBox = document.createElement("div");
  const bodyText = document.createElement("p");
  bodyText.classList.add("text-break");
  bodyText.innerText = post.body;

  if (!post.media == null || !post.media == "") {
    const mediaBox = document.createElement("div");
    mediaBox.classList.add(
      "col-12",
      "col-md-6",
      "col-lg-4",
      "mb-3",
      "d-flex",
      "m-auto"
    );
    const media = document.createElement("img");
    media.classList.add("img-fluid");
    media.src = post.media;
    media.alt = "post image";
    mediaBox.appendChild(media);
    feedBox.appendChild(mediaBox);
  }

  const buttonBox = document.createElement("div");
  buttonBox.classList.add(
    "d-flex",
    "flex-wrap",
    "justify-content-between",
    "w-100"
  );

  const commentButton = document.createElement("button");
  commentButton.innerText = "Add Comment";
  commentButton.classList.add("btn", "btn-primary", "mt-2", "col-4");
  buttonBox.appendChild(commentButton);

  const likeButton = document.createElement("button");
  likeButton.innerText = "Like";
  likeButton.classList.add("btn", "btn-primary", "mt-2", "col-2");
  buttonBox.appendChild(likeButton);

  const commentInput = document.createElement("textarea");
  commentInput.classList.add("form-control", "mt-2");
  commentInput.setAttribute("aria-label", "comment textarea");
  commentInput.placeholder = "Write your comment here...";
  commentInput.setAttribute("name", "body");
  commentInput.style.display = "none";

  const sendButton = document.createElement("button");
  sendButton.innerText = "Send";
  sendButton.classList.add("btn", "btn-success", "mt-2", "col-4");
  sendButton.style.display = "none";

  sendButton.addEventListener("click", async (e) => {
    const comment = {
      body: commentInput.value,
    };
    postComment(post.id, comment);
    sendButton.style.display = "none";
    commentInput.style.display = "none";
    commentInput.value = "";
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  commentButton.addEventListener("click", () => {
    if (commentInput.style.display === "none") {
      commentInput.style.display = "block";
      sendButton.style.display = "block";
      commentButton.innerText = "Close Comment";
    } else {
      commentInput.style.display = "none";
      sendButton.style.display = "none";
      commentButton.innerText = "Add Comment";
    }
  });

  likeButton.addEventListener("click", async () => {
    postLikeReaction(post.id);
    likeButton.innerText = "Liked";
    likeButton.classList.remove("btn-primary");
    likeButton.classList.add("btn-success");
  });

  const commentReactionBox = document.createElement("a");
  commentReactionBox.href = `/profile/index.html?id=${post.id}`;
  commentReactionBox.classList.add("d-flex", "justify-content-end", "gap-3");
  const commentCount = document.createElement("p");
  commentCount.classList.add("text-end", "text-muted", "mb-0");
  commentCount.innerText = `${post._count.comments} Comments`;
  const reactionCount = document.createElement("p");
  reactionCount.classList.add("text-end", "text-muted", "mb-0");
  reactionCount.innerText = `${post._count.reactions} Likes`;
  commentReactionBox.appendChild(commentCount);
  commentReactionBox.appendChild(reactionCount);

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
  feedBox.append(commentReactionBox);
  feedBox.append(buttonBox);
  feedBox.append(commentInput);
  feedBox.append(sendButton);

  if (post.comments.length > 0) {
    const commentBox = document.createElement("div");
    commentBox.classList.add("d-flex", "flex-column", "justify-content-center");
    const commentHeader = document.createElement("h4");
    commentHeader.classList.add("text-left", "m-auto", "w-100", "fs-6", "mt-4");
    commentHeader.innerText = "Comments";
    const commentList = document.createElement("ul");
    commentList.classList.add("p-3", "list-group", "d-flex");
    commentList.id = "commentList";
    const maxComments = 4;
    const comments = post.comments.slice(0, maxComments);

    comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      commentItem.classList.add("list-group-item", "text-break");
      commentItem.innerText = comment.body;
      const commentAuthor = document.createElement("p");
      const creationDate = formatDate(comment.created);
      commentAuthor.classList.add("text-muted", "mb-0");
      commentAuthor.innerText = `Posted by ${comment.author.name} on ${creationDate}`;
      commentItem.appendChild(commentAuthor);
      commentList.appendChild(commentItem);
      commentBox.prepend(commentHeader);
      commentBox.append(commentList);
      feedBox.append(commentBox);
    });

    if (post.comments.length > 4) {
      const showMoreComments = document.createElement("a");
      showMoreComments.classList.add(
        "text-weak",
        "fs-6",
        "text-decoration-none",
        "clickableLink"
      );
      showMoreComments.innerText = "Show more comments..";
      showMoreComments.addEventListener("click", (e) => {
        e.preventDefault();
        const remainingComments = post.comments.slice(maxComments);
        remainingComments.forEach((comment) => {
          const commentItem = document.createElement("li");
          commentItem.classList.add("list-group-item", "text-break");
          commentItem.innerText = comment.body;
          const commentAuthor = document.createElement("p");
          const creationDate = formatDate(comment.created);
          commentAuthor.classList.add("text-muted", "mb-0");
          commentAuthor.innerText = `Posted by ${comment.author.name} on ${creationDate}`;
          commentItem.appendChild(commentAuthor);
          commentList.appendChild(commentItem);
        });
        showMoreComments.style.display = "none";
      });
      commentBox.append(showMoreComments);
    }
  }
}

/**
 * Iteratively creates and renders individual post elements based on an array of post data.
 *
 * Dependencies:
 * - Depends on the `createPost` function to render each individual post.
 *
 * @param {Array<Object>} posts - An array containing post data objects to be rendered.
 * @returns {Promise<void>} A Promise that resolves when all posts have been successfully rendered.
 *
 * @throws Will throw an error if there's an issue rendering any of the individual posts.
 *
 * @example
 * const postDataArray = [
 *   { id: 1, title: 'First Post', content: 'This is the first post.' },
 *   { id: 2, title: 'Second Post', content: 'This is the second post.' }
 * ];
 * await createPosts(postDataArray);  // Renders both posts.
 */
export async function createPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    createPost(post);
  }
}

/**
 * Builds and populates the feed with post data.
 * If filtered data is provided, the feed is built using it; otherwise, the feed is populated with all posts.
 *
 * Dependencies:
 * - Assumes the presence of a `loader` and `feedContainer` DOM element.
 * - Depends on the `postFetch` function to retrieve all posts.
 * - Depends on the `createPosts` function to create and render posts based on provided data.
 *
 * @param {Array<Object>} [filteredData] - An optional array of post data to populate the feed with.
 *                                        If not provided, all posts are fetched and used.
 *
 * @example
 * const latestPosts = [{...}, {...}, {...}];
 * buildFeed(latestPosts); // Populates the feed with the provided latest posts.
 *
 * buildFeed(); // Fetches all posts and populates the feed.
 */
export async function buildFeed(filteredData) {
  if (filteredData) {
    loader.classList.remove("d-none");
    feedContainer.innerHTML = "";
    createPosts(filteredData);
  } else {
    const allPosts = await postFetch();
    feedContainer.innerHTML = "";
    createPosts(allPosts);
  }
}

/**
 * Builds and populates the feed with posts specific to a given user.
 *
 * Dependencies:
 * - Depends on the `fetchUsersPosts` function to retrieve posts of a specific user.
 * - Depends on the `createPosts` function to create and render posts based on provided data.
 *
 * @param {Object} user - The user object, typically containing at least user identification details.
 * @returns {Promise<void>} A Promise that resolves when the feed has been built.
 *
 * @example
 * const currentUser = { id: 123, name: 'John Doe' };
 * await buildUserFeed(currentUser); // Populates the feed with posts specific to 'John Doe'.
 */
export async function buildUserFeed(user) {
  const userPostData = await fetchUsersPosts(user);

  createPosts(userPostData);
}

/**
 * Builds and renders a single post based on a specific post ID present in the URL query string.
 *
 * Dependencies:
 * - Depends on the `apiFetch` function to retrieve the specific post using its ID.
 * - Depends on the `loadProfile` function to load the author's profile.
 * - Depends on the `createPost` function to create and render the post based on the retrieved data.
 *
 * Assumptions:
 * - It's assumed that the URL contains a query parameter named 'id' which corresponds to the post ID.
 *
 * @returns {Promise<void>} A Promise that resolves when the post has been built and rendered.
 *
 * @example
 * // Assuming the current URL is 'https://example.com/post.html?id=123'
 * await buildSinglePost(); // Fetches post with ID 123 and renders it.
 */
export async function buildSinglePost() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const searchId = params.get("id");

  const postById = await apiFetch(
    `${baseUrl}/posts/${searchId}${authorInclude}&_comments=true&_reactions=true`,
    "get"
  );

  await loadProfile(postById.author.name);
  createPost(postById);
}
