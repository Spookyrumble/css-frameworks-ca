import { apiFetch } from "../utils.js";
import { baseUrl, postUrl } from "../API/urls.js";

// Function to create and show the modal
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
      //   hideModal();
      setTimeout(function () {
        // location.reload();
        hideModal();
      }, 400);
    } else console.log("Error updating post");
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "btn-primary");
  //   cancelBtn.id = "closeModal";
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

export function hideModal() {
  const overlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector(".modal");

  overlay.remove();
  modal.remove();
}

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
