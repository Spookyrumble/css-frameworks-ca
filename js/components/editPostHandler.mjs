import { apiFetch } from "../API/utils/utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

/**
 * Displays a modal dialog allowing the user to edit a post.
 * The function dynamically creates and appends a modal overlay and modal dialog to the main content.
 * Inside the modal, a form is provided to edit the post's title, body, and media.
 * Two buttons are also included: Save and Cancel. The Save button attempts to update the post,
 * and the Cancel button hides the modal.
 *
 * @param {number|string} id - The ID of the post to be edited.
 * @param {string} title - The current title of the post.
 * @param {string} body - The current body/content of the post.
 * @param {string} media - The current media URL associated with the post.
 *
 * @example
 * showModal(123, 'Sample Title', 'This is the body.', 'https://example.com/sample-image.jpg');
 */
export function showModal(id, title, body, media) {
  const feedContainer = document.querySelector("main");
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  document.body.appendChild(overlay);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("fs-5");
  modalTitle.innerText = `Edit post with ID: ${id}`;
  modal.append(modalTitle);

  const modalForm = document.createElement("form");
  modalForm.classList.add("form-group", "my-2");
  modalForm.id = "editPostForm";
  modal.append(modalForm);
  const modalTitleInput = document.createElement("input");
  const modalTitleLabel = document.createElement("label");
  modalTitleLabel.innerText = "Change title";
  modalTitleInput.classList.add("form-control", "mb-4");
  modalTitleInput.setAttribute("name", "title");
  modalTitleInput.value = title;
  modalForm.append(modalTitleLabel);
  modalForm.append(modalTitleInput);

  const modalBodyInput = document.createElement("textarea");
  const modalBodyLabel = document.createElement("label");
  modalBodyLabel.innerText = "Change body";
  modalBodyInput.classList.add("form-control", "mb-4");
  modalBodyInput.setAttribute("name", "body");
  modalBodyInput.value = body;
  modalForm.append(modalBodyLabel);
  modalForm.append(modalBodyInput);

  const modalMediaInput = document.createElement("input");
  const modalMediaLabel = document.createElement("label");
  modalMediaLabel.innerText = "Change media";
  modalMediaInput.classList.add("form-control", "mb-4");
  modalMediaInput.setAttribute("name", "media");
  modalMediaInput.value = media;
  modalMediaInput.placeholder = "Must be a valid URL(image address)";
  modalForm.append(modalMediaLabel);
  modalForm.append(modalMediaInput);

  const btnBox = document.createElement("div");
  btnBox.classList.add("d-flex", "justify-content-between", "m-3");
  modalForm.append(btnBox);

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("btn", "btn-secondary");
  saveBtn.innerText = "Save";
  btnBox.append(saveBtn);
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updatePost(modalForm, `${id}`);
    if (updatePost) {
      setTimeout(function () {
        hideModal();
      }, 400);
    } else console.log("Error updating post");
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "btn-primary");
  cancelBtn.innerText = "Cancel";
  btnBox.append(cancelBtn);

  feedContainer.appendChild(modal);

  overlay.style.display = "block";
  modal.style.display = "block";

  overlay.addEventListener("click", hideModal);
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal();
  });
}

/**
 * Hides and removes the modal and its overlay from the DOM.
 * The function searches for elements with the class names `.modal-overlay` and `.modal`,
 * and subsequently removes them from the DOM.
 *
 * @function hideModal
 *
 * @example
 *
 * // To hide and remove the modal:
 * hideModal();
 */
export function hideModal() {
  const overlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector(".modal");

  overlay.remove();
  modal.remove();
}

/**
 * Updates a post based on the provided form data and post ID.
 * Sends a PUT request to the server with the updated post data.
 * Logs the update process to the console and returns a boolean value
 * indicating if the update was successful.
 *
 * @async
 * @function updatePost
 * @param {HTMLFormElement} form - The form element containing post update data.
 * @param {number|string} postId - The ID of the post to be updated.
 * @returns {boolean} Returns `true` if the post was successfully updated, `undefined` otherwise.
 *
 * @example
 *
 * // Let's say we have a form element with id "updateForm" and a post ID of 10.
 * const formElement = document.getElementById("updateForm");
 *
 * updatePost(formElement, 10)
 *   .then(success => {
 *     if (success) {
 *       console.log("The post was successfully updated.");
 *     } else {
 *       console.log("Failed to update the post.");
 *     }
 *   });
 */
async function updatePost(form, postId) {
  const formData = new FormData(form);

  const post = {
    title: formData.get("title"),
    body: formData.get("body"),
    media: formData.get("media"),
  };

  try {
    const response = await apiFetch(
      `${baseUrl}${postUrl}/${postId}`,
      "PUT",
      post
    );
    if (response) {
      console.log("Post updated:", response);
      return true;
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
