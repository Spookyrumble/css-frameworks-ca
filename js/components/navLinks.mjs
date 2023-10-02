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
export function linkAuthorizations() {
  const profileLink = document.getElementById("profileNavLink");
  const feedLink = document.getElementById("feedNavLink");
  const searchBtn = document.getElementById("searchNavBtn");
  const signOut = document.getElementById("signOut");

  const token = localStorage.getItem("accessToken");
  if (token) {
    profileLink.classList.remove("disabled");
    feedLink.classList.remove("disabled");
    signOut.classList.remove("disabled");
    searchBtn.removeAttribute("disabled");
  }
}
