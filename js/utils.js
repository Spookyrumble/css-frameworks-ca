export const API_BASE_URL = "https://api.noroff.dev/api/v1/social";

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
export { validateEmail };

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

//Reusable fetch function
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
    return json;
  } catch (error) {
    console.log(error);
  }
}

export { apiFetch };

// async function checkFollowingStatus(textElement, targetUserName) {
//   try {
//     // Fetch your own profile data (it returns json)
//     const response = await apiFetch(
//       `${API_BASE_URL}/profiles/Hans?_following=true`
//     );
//     const profileData = response;

//     // Check if you are following the target user
//     const isFollowing = profileData.following.some(
//       (followingUser) => followingUser.name === targetUserName
//     );

//     if (isFollowing) {
//       textElement.textContent = "Unfollow";
//     } else {
//       textElement.textContent = "Follow";
//     }
//   } catch (error) {
//     console.error("Error checking following status:", error);
//   }
// }

// export { checkFollowingStatus };
