const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const formEditProfile = document.forms["edit-profile"];
const name = formEditProfile.elements["name"];
const description = formEditProfile.elements["description"];

const formNewPlace = document.forms["new-place"];

// Функция закрытия модального окна

export function closeModalEsc(evt) {
  const modal = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(modal);
  }
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

// Открытие/закрытие попапа редактирования

export function openPopupEdit() {
  name.value = "Жак-Ив Кусто";
  description.value = "Исследователь океана";
  popupEdit.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeModalEsc);
}

export function closePopupEdit() {
  formEditProfile.reset();
  popupEdit.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closeModalEsc);
}

// Открытие/закрытие попапа карточек

export function openPopupNewCard() {
  popupNewCard.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeModalEsc);
}

export function closePopupNewCard() {
  formNewPlace.reset();
  popupNewCard.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closeModalEsc);
}

// Функция открытия модального окна

export function openModal(element) {
  element.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeModalEsc);
  const closeButton = element.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(element));
  }
}
