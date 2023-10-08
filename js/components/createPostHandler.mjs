import { apiFetch } from "../utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

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
      if (response.ok) {
        console.log("Post created:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });
}
