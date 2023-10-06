import { logOut } from "../utils.js";
/**
 * Manages the authorization for profile and feed navigation links, the search button, and the sign out button based on the presence of an access token.
 *
 * This function retrieves the navigation link elements for the profile and feed pages,
 * the search button element, and the sign out button element from the DOM.
 * It then checks for the presence of an access token in local storage.
 * If an access token is found, it removes the "disabled" class from the profile and feed links,
 * the sign out button, and the `disabled` attribute from the search button, effectively enabling them.
 *
 * @function
 * @export
 *
 * @example
 * // Call this function once to set up the authorization based interactions.
 * linkAuthorizations();
 */
const profileLink = document.getElementById("profileNavLink");
profileLink.style.cursor = "pointer";
const feedLink = document.getElementById("feedNavLink");
feedLink.style.cursor = "pointer";
const searchBtn = document.getElementById("searchNavBtn");
const signOut = document.getElementById("signOut");
signOut.style.cursor = "pointer";

export function linkAuthorizations() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    profileLink.classList.remove("disabled");
    feedLink.classList.remove("disabled");
    signOut.classList.remove("disabled");
    searchBtn.removeAttribute("disabled");
  }
}

function navListeners() {
  profileLink.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("userId");
    window.location.href = `/profile/index.html?id=${loggedInUser}`;
  });
}

function signOutListener() {
  const signOutBtn = document.querySelector("#signOut");
  signOutBtn.addEventListener("click", function () {
    logOut();
  });
}
export { navListeners, signOutListener };
