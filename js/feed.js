import { navListeners, signOutListener } from "./components/navLinks.mjs";
import { buildFeed } from "./components/postHandler.mjs";
import { feedFilter } from "./components/filterHandler.mjs";
import { performSearch } from "./components/searchHandler.mjs";
import { createPostEntry } from "./components/createPostHandler.mjs";

navListeners();
signOutListener();
createPostEntry();

const filteredArray = feedFilter();
buildFeed(filteredArray);

const dropdownFilter = document.getElementById("sortBy");
dropdownFilter.addEventListener("change", () => {
  buildFeed(filteredArray);
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  performSearch(searchTerm);
});
