import { logOut } from "../utils.js";

const logoLink = document.getElementById("logoLink");
const profileLink = document.getElementById("profileNavLink");
profileLink.style.cursor = "pointer";
const feedLink = document.getElementById("feedNavLink");
feedLink.style.cursor = "pointer";
const searchBtn = document.getElementById("searchNavBtn");
const signOut = document.getElementById("signOut");
signOut.style.cursor = "pointer";
const loggedInUser = localStorage.getItem("userId");

export function linkAuthorizations() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    profileLink.classList.remove("disabled");
    feedLink.classList.remove("disabled");
    signOut.classList.remove("disabled");
    // searchBtn.removeAttribute("disabled");
  }
}

function logoListener() {
  logoLink.addEventListener("click", () => {
    window.location.href = `/profile/index.html?id=${loggedInUser}`;
  });
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
export { navListeners, signOutListener, logoListener };
