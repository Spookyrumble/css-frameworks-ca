import { loadProfile } from "./components/profileHandler.mjs";
import { buildFeed } from "./components/postHandler.mjs";
import { buildUserFeed } from "./components/postHandler.mjs";
import { buildSinglePost } from "./components/postHandler.mjs";
import { navListeners, signOutListener } from "./components/navLinks.mjs";

navListeners();
signOutListener();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchId = params.get("id");
const userId = localStorage.getItem("userId");

/**
 * Verifies the format of the querystring (document.location.search, or searchId in this case) and calls appropriate functions
 * based on its format.
 *
 * - If searchId is null, it loads the user profile and feed for the given userId.
 * - If searchId contains both letters and numbers, it loads the profile and user feed for the searchId.
 * - If searchId consists only of numbers, it builds a single post using the searchId.
 *
 * @function
 * @global
 * @requires loadProfile
 * @requires buildFeed
 * @requires buildUserFeed
 * @requires buildSinglePost
 * @example
 *
 * // Assuming `searchId` is globally defined.
 *
 * // If searchId is '123abc':
 * // This will call loadProfile('123abc') and buildUserFeed('123abc').
 *
 * // If searchId is '12345':
 * // This will call buildSinglePost('12345').
 * // loadProfile will be built with data from the data passed to buildSinglePost.
 *
 * // If searchId is null and userId is 'abcUser':
 * // This will call loadProfile('abcUser') and buildFeed('abcUser').
 *
 * idVerify();
 */
function idVerify() {
  const isOnlyNumbers = /^\d+$/.test(searchId);
  const hasLetterAndNumber = /[a-zA-Z]/.test(searchId);
  if (searchId === null) {
    const userIdentifier = userId;
    loadProfile(userIdentifier);
    buildFeed(userIdentifier);
  } else if (hasLetterAndNumber) {
    const userIdentifier = searchId;
    loadProfile(userIdentifier);
    buildUserFeed(userIdentifier);
  } else if (isOnlyNumbers) {
    const userIdentifier = searchId;
    buildSinglePost(userIdentifier);
  }
}
idVerify();
