import { apiFetch } from "./utils.js";
import { buildFeed } from "./components/postHandler.mjs";
import { baseUrl, postUrl, authorInclude } from "./API/urls.js";
import { navListeners, signOutListener } from "./components/navLinks.mjs";
navListeners();
signOutListener();

buildFeed();
