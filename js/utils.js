/**
 * Listens for change event on the checkbox and adds the full name input when checked
 */
function checkboxValidation() {
  const newUserToggle = document.getElementById("newUserCheckBox");
  const newUserInput = document.getElementById("newUserInput");
  const loginBtn = document.getElementById("loginBtn");

  newUserToggle.addEventListener("change", function () {
    if (newUserToggle.checked) {
      newUserInput.classList.remove("d-none"),
        (loginBtn.innerText = "Register");
    } else if (!newUserToggle.checked) {
      loginBtn.innerText = "Login";
      newUserInput.classList.add("d-none");
    }
  });
}
export { checkboxValidation };

/**
 * Deletes the items in local storage and redirects the user to the login page
 */
function logOut() {
  localStorage.clear();
  window.location.href = "/";
}

export { logOut };

/**
 * Makes an asynchronous HTTP request to a specified URL with the provided method and body.
 *
 * This function uses the Fetch API to make an HTTP request. It uses an access token from the
 * local storage as an authorization header for the request, if available. It also sets the
 * "Content-Type" header to "application/json".
 *
 * @param {string} url - The URL to make the request to.
 * @param {string} fetchMethod - The HTTP method for the request (e.g., "GET", "POST").
 * @param {Object} [body=null] - The request payload as a plain object. It is stringified before sending.
 * @returns {Promise<Object>} - Returns a promise that resolves with the JSON response of the request.
 * @throws Will throw an error if the fetch request encounters a problem.
 */
async function apiFetch(url, fetchMethod, body = null) {
  try {
    const token = localStorage.getItem("accessToken");

    const options = {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}

export { apiFetch };

export function formatDate(date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
}
