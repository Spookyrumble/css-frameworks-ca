import { apiFetch } from "../API/utils/utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

/**
 * Sets up an event listener for a form to create a post entry.
 * Once the form is submitted, this function will collect the data,
 * send a POST request to create a new post, reset the form,
 * and then refresh the page after a short delay.
 *
 * @function createPostEntry
 *
 * @example
 *
 * // Given a form with ID "createForm" and relevant input fields,
 * // this function will handle the post creation process.
 * createPostEntry();
 */
export function createPostEntry() {
  const createPostForm = document.getElementById("createForm");

  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(createPostForm);

    const post = {
      title: formData.get("title"),
      body: formData.get("body"),
      media: formData.get("media"),
    };

    try {
      const response = await apiFetch(`${baseUrl}${postUrl}`, "POST", post);
      if (response) {
        console.log("Post created:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
    createPostForm.reset();
    setTimeout(function () {
      location.reload();
    }, 400);
  });
}
