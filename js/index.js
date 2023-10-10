import { checkboxValidation } from "./utils.js";
import {
  linkAuthorizations,
  navListeners,
  logoListener,
} from "./components/navLinks.mjs";

navListeners();
// logoListener();
linkAuthorizations();

export const API_BASE_URL = "https://api.noroff.dev/api/v1/social/";
const authString = "auth/";
const registerString = "register/";
const loginString = "login/";

// ADDS THE FULL NAME INPUT WHEN NEW USER CHECKBOX IS CHECKED AND ENABLES THE REGISTER BUTTON
const newUserToggle = document.getElementById("newUserCheckBox");
const newUserBtn = document.getElementById("registerBtn");
const newUserInput = document.getElementById("newUserInput");

newUserToggle.addEventListener("change", function () {
  if (newUserToggle.checked) {
    newUserInput.classList.remove("d-none"),
      newUserBtn.removeAttribute("disabled");
  } else if (!newUserToggle.checked) {
    newUserInput.classList.add("d-none");
    newUserBtn.disabled = true;
  }
});

// REGISTER USER. GRABS THE INPUT DATA, CREATES THE USER OBJECT AND POSTS IT TO CREATE NEW USER.
const form = document.getElementById("loginForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/**
 * Creates a new user object and posts it to the API
 */
function createNewUser() {
  const userName = nameInput.value;

  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  const userObject = {
    name: userName.toLowerCase(),
    email: userEmail,
    password: userPassword,
  };

  fetch(API_BASE_URL + authString + registerString, {
    name: userName,
    email: userEmail,
    password: userPassword,
  });
  console.log(userObject);

  fetch(API_BASE_URL + registerString, {
    method: "POST",
    body: JSON.stringify(userObject),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => {
      console.error("Registration failed:", error);
    });
}

/**
 * creates a user object with the email and password from the input fields
 * @returns user object with email and password
 * Grab user data and store it in an object
 * @returns userObject
 */
function grabsUserData() {
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;
  const userObject = {
    email: userEmail,
    password: userPassword,
  };
  return userObject;
}

/**
 * USER AUTHENTICATION FUNCTION
 * @param {string} url
 * @param {any} data
 * @returns json or error and stores the access token in local storage
 * ```js
 * loginUser(API_BASE_URL + loginString, user);
 */
async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);

    if (response.ok) {
      const json = await response.json();
      const { accessToken, name } = json;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", name);
      console.log(json);
      return { success: true, data: json };
    } else {
      console.error("Login failed:", response.status);
      return { success: false };
    }

    // const json = await response.json();
    // const accessToken = json.accessToken;
    // localStorage.setItem("accessToken", accessToken);
    // console.log(json);
    // return json;
  } catch (error) {
    console.log("There was an error authenticating the user", error);
  }
}

checkboxValidation();

/**
 * Attaches an event listener to the login/registration form.
 *
 * The function checks if the "new user" checkbox is checked on form submission. If it's checked,
 * the function attempts to create a new user. Otherwise, it attempts to log the user in.
 *
 * After a successful login, the function redirects the user to their profile page. If the login
 * is unsuccessful, the function alerts the user that the credentials are either wrong or that
 * the user does not exist.
 */
function formListener() {
  const newUserToggle = document.getElementById("newUserCheckBox");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (newUserToggle.checked) {
      createNewUser();
    } else {
      const user = grabsUserData();
      console.log(user);
      const result = await loginUser(
        API_BASE_URL + authString + loginString,
        user
      );
      console.log(result);

      if (result.success && localStorage.getItem("accessToken")) {
        const userId = localStorage.getItem("userId");
        window.location.replace(`/profile/index.html?id=${userId}`);
      } else {
        console.log("user does not exist or credentials are wrong");
        alert("user does not exist or credentials are wrong");
      }
    }
  });
}
formListener();
