import { logOut } from "../API/utils/utils.js";

const logoLink = document.getElementById("logoLink");
const profileLink = document.getElementById("profileNavLink");
// profileLink.style.cursor = "pointer";
const feedLink = document.getElementById("feedNavLink");
// feedLink.style.cursor = "pointer";
const signOut = document.getElementById("signOut");
// signOut.style.cursor = "pointer";
const loggedInUser = localStorage.getItem("userId");

/**
 * Adjusts the authorization of certain links based on the presence of an access token in the local storage.
 * If the access token is present, some links are enabled; otherwise, they remain disabled.
 *
 * Dependencies:
 * - Assumes `localStorage` is available and can be queried for an "accessToken".
 * - Assumes DOM elements with the variable names `profileLink`, `feedLink`, and `signOut` exist and represent specific links or buttons in the UI.
 *
 * @example
 * linkAuthorizations(); // Checks for an access token and updates link authorizations accordingly.
 */
export function linkAuthorizations() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    profileLink.classList.remove("disabled");
    feedLink.classList.remove("disabled");
    signOut.classList.remove("disabled");
  }
}

/**
 * Adds a click event listener to the logo link that redirects the user to their profile page.
 */
function logoListener() {
  logoLink.addEventListener("click", () => {
    window.location.href = `/profile/index.html?id=${loggedInUser}`;
  });
}

/**
 * Attaches an event listener to the "Profile" navigation link.
 * When the link is clicked, the browser is redirected to the profile page of the currently logged-in user.
 *
 * Dependencies:
 * - Assumes a DOM element with the variable name `profileLink` exists and represents the "Profile" navigation link.
 * - Uses the local storage to retrieve the ID of the currently logged-in user.
 *
 * @example
 * navListeners(); // Binds the navigation functionality to the profile link.
 */
function navListeners() {
  profileLink.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("userId");
    window.location.href = `/profile/index.html?id=${loggedInUser}`;
  });
}

/**
 * Attaches an event listener to the "Sign Out" button.
 * When the button is clicked, the `logOut` function is called to handle the user's sign-out process.
 *
 * Dependencies:
 * - Relies on an external function: `logOut`.
 *
 * @example
 * signOutListener(); // Binds the sign-out functionality to the button with the ID "signOut".
 */
function signOutListener() {
  const signOutBtn = document.querySelector("#signOut");
  signOutBtn.addEventListener("click", function () {
    logOut();
  });
}
export { navListeners, signOutListener, logoListener };
