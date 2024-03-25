
export function openModal(element) {
  element.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

export function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closeModal(popupIsOpened);
  }
}
