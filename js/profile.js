import { API_BASE_URL } from "./utils.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const token = localStorage.getItem("accessToken");
const userId = localStorage.getItem("userId");

const userOptions = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

/**
 * Asynchronously fetches user data from the specified URL using the provided fetch options.
 * Logs the fetched data to the console if the fetch is successful, or logs an error if the fetch fails.
 * Calls the displayUserProfile function with the fetched data.
 *
 * @async
 * @function
 * @param {string} url - The URL to fetch data from.
 * @param {Object} fetchOptions - The options object to pass to the fetch function.
 * @throws Will log and throw an error if the fetch fails.
 * @returns {undefined} Nothing is returned from this function.
 *
 * @example
 *
 * const url = 'https://api.example.com/user';
 * const options = {
 *   method: 'GET',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 * };
 *
 * fetchUser(url, options);
 */
async function fetchUser(url, fetchOptions) {
  try {
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
    return json;
    // displayUserProfile(json);
  } catch (error) {
    console.log(error);
  }
}

function renderProfile() {
  const url = `${API_BASE_URL}/profiles/${userId}`;
  fetchUser(url, userOptions).then((json) => displayUserProfile(json));
  // const data = fetchUser(url, userOptions);
}
displayUserProfile;
// fetchUser(`${API_BASE_URL}profiles/${id}`, userOptions);
renderProfile();

// function that loops through the data and displays the user profile
function displayUserProfile(data) {
  const profileContainer = document.querySelector("#profileContainer");
  const profileName = document.querySelector("#nameContainer");
  // const profileAvatar = document.querySelector("#imageContainer");

  // profileAvatar.src = data.avatar;
  profileName.innerText = data.name;

  // profileContainer.appendChild(profileAvatar);
  profileContainer.appendChild(profileName);
}

// function that listens to the signout and removes the token from local storage
import { logOut } from "./utils.js";
function signOutListener() {
  const signOutBtn = document.querySelector("#signOut");
  signOutBtn.addEventListener("click", function () {
    logOut();
  });
}
signOutListener();
