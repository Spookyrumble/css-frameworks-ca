import { API_BASE_URL } from "./utils.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const token = localStorage.getItem("accessToken");

const userOptions = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function fetchUser(url, fetchOptions) {
  try {
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

fetchUser(`${API_BASE_URL}profiles/${id}`, userOptions);
