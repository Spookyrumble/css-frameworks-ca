import { apiFetch } from "./utils.js";
import { checkboxValidation } from "./utils.js";
import {
  linkAuthorizations,
  navListeners,
  logoListener,
} from "./components/navLinks.mjs";
import { baseUrl } from "./API/urls.js";

navListeners();
// logoListener();
linkAuthorizations();

// export const API_BASE_URL = "https://api.noroff.dev/api/v1/social/";
const authString = "auth";
const registerString = "register";
const loginString = "login";

// ADDS THE FULL NAME INPUT WHEN NEW USER CHECKBOX IS CHECKED AND ENABLES THE REGISTER BUTTON
const newUserToggle = document.getElementById("newUserCheckBox");
const newUserInput = document.getElementById("newUserInput");

newUserToggle.addEventListener("change", function () {
  if (newUserToggle.checked) {
    newUserInput.classList.remove("d-none");
  } else if (!newUserToggle.checked) {
    newUserInput.classList.add("d-none");
  }
});

// REGISTER USER. GRABS THE INPUT DATA, CREATES THE USER OBJECT AND POSTS IT TO CREATE NEW USER.
const form = document.getElementById("loginForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/**
 * Asynchronously creates a new user.
 *
 * This function gathers data from form input fields (assumed to be globally available)
 * and sends a POST request to create a new user. If the user's name contains any spaces,
 * they are replaced with underscores before being sent to the server.
 *
 * @async
 * @function
 * @returns {void}
 * @throws Will throw an error if the fetch request encounters any issues.
 *
 * @example
 * createNewUser()
 *   .then(() => console.log('User created successfully'))
 *   .catch(error => console.error('Error creating user:', error));
 */
async function createNewUser() {
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  const userObject = {
    email: userEmail,
    name: userName.replace(/\s+/g, "_"),
    password: userPassword,
  };

  console.log(userObject);

  try {
    const response = await fetch(`${baseUrl}/${authString}/${registerString}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
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
 * Asynchronously logs a user in by sending a POST request with provided user data.
 *
 * Upon successful login, the function stores the accessToken and user's name (which is assumed to be the user's ID here)
 * into the local storage. If the login fails, it will return a success flag set to `false` and log an error.
 *
 * @async
 * @function
 * @param {string} url - The endpoint URL for logging in.
 * @param {Object} data - The user data for login.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} Returns an object with a `success` flag and, upon successful login, a `data` object.
 * @throws Will log an error if there's an issue with the fetch request or the provided data.
 *
 * @example
 * loginUser("https://api.example.com/login", { email: "john@example.com", password: "123456" })
 *   .then(result => {
 *     if (result.success) {
 *       console.log("Login successful!", result.data);
 *     } else {
 *       console.error("Login failed");
 *     }
 *   })
 *   .catch(error => console.error("Error logging in:", error));
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
        `${baseUrl}/${authString}/${loginString}`,
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
