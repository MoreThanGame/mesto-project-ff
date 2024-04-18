import "../pages/index.css";
import { addCard, deleteCard } from "../components/card.js";
import { toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserDataApi,
  getInitialCardsApi,
  sendNewCardApi,
  sendUserDataApi,
  deletePopupCardApi,
  updateUserAvatarApi,
} from "./api.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const nameElement = document.querySelector(".profile__title");
const profileTitleText = nameElement.textContent;
const jobElement = document.querySelector(".profile__description");
const profiledescriptionText = jobElement.textContent;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(
  ".popup__input_type_description"
);
const popupImage = document.querySelector(".popup_type_image");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");
export const popup = document.querySelectorAll(".popup");
const popupCloseButton = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formEditProfile = document.forms["edit-profile"];
const name = formEditProfile.elements["name"];
const description = formEditProfile.elements["description"];
name.value = "Жак-Ив Кусто";
description.value = "Исследователь океана";
const formNewPlace = document.forms["new-place"];
export const cardNameInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_card-name"
);
export const cardLinkInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_url"
);
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);
const formUpdateAvatar = document.forms["update-avatar-form"];
const avatarLinkInput = formUpdateAvatar.elements["avatar-link"];
const deleteCardForm = popupDeleteCard.querySelector(".popup__form");
let currentCardId = null;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderCard(cardData, myUserId, prepend = false) {
  const newCard = addCard({
    name: cardData.name,
    link: cardData.link,
    deleteCard: cardData.owner._id === myUserId ? deleteCard : null,
    openImagePopup,
  });

  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    toggleLike(likeButton, cardData._id)
  );

  const likeCountElement = newCard.querySelector(".card__like-count");
  likeCountElement.textContent = cardData.likes.length;

  if (cardData.owner._id !== myUserId) {
    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.classList.add("card__delete-button-hidden");
  } else {
    const deleteButton = newCard.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () =>
      confirmDeleteCard(cardData._id)
    );
  }

  if (prepend) {
    placesList.prepend(newCard);
  } else {
    placesList.append(newCard);
  }
}

function confirmDeleteCard(cardId) {
  currentCardId = cardId;
  openModal(popupDeleteCard);
}

deleteCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (currentCardId) {
    deleteCardHandler(currentCardId);
    currentCardId = null;
  }
});

function deleteCardHandler(cardId, cardElement) {
  deletePopupCardApi(cardId)
    .then(() => {
      if (cardElement) {
        cardElement.remove();
      }
      closeModal(popupDeleteCard);
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

profileImageContainer.addEventListener("click", function () {
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
});

formUpdateAvatar.addEventListener("submit", function (event) {
  event.preventDefault();
  setLoadButton(formUpdateAvatar, true);
  updateUserAvatarApi(avatarLinkInput.value)
    .then((data) => {
      setLoadButton(formUpdateAvatar, false);
      const avatarImage = document.querySelector(".profile__image");
      avatarImage.style.backgroundImage = `url(${avatarLinkInput.value})`;

      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
      setLoadButton(formUpdateAvatar, false);
    });
});

function setLoadButton(formElement, isLoading) {
  const submitButton = formElement.querySelector(".popup__button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.textContent = "Сохранить";
    submitButton.removeAttribute("disabled");
  }
}

Promise.all([getUserDataApi(), getInitialCardsApi()])
  .then(([userData, initialCards]) => {
    console.log("Данные пользователя:", userData);
    console.log("Начальные карточки:", initialCards);
    const myUserId = userData._id;
    initialCards.forEach((cardData) => {
      renderCard(cardData, myUserId);
    });
  })
  .catch((error) => {
    console.log("Ошибка:", error);
  });

// Открыть модальное окно

function openEditPopup(evt) {
  if (evt.target === profileEditButton) {
    name.value = profileTitleText;
    description.value = profiledescriptionText;
  }
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
}

profileEditButton.addEventListener("click", openEditPopup);

profileAddButton.addEventListener("click", function () {
  formNewPlace.reset();
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

// Закрыть модальное окно

popupCloseButton.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

popup.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.target);
    }
  });
});

// Редактирование профиля

function editFormProfileSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  setLoadButton(formEditProfile, true);

  sendUserDataApi()
    .then((response) => {
      nameElement.textContent = nameValue;
      jobElement.textContent = jobValue;
      closeModal(popupEdit);
      setLoadButton(formEditProfile, false);
      console.log("Данные пользователя обновлены:", response);
    })
    .catch((error) => {
      console.error("Ошибка при отправке данных:", error);
      setLoadButton(formEditProfile, false);
    });
}

formEditProfile.addEventListener("submit", editFormProfileSubmit);

// Добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();
  setLoadButton(formNewPlace, true);
  sendNewCardApi()
    .then((newCard) => {
      setLoadButton(formNewPlace, false);
      renderCard(newCard, null, true);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
      setLoadButton(formNewPlace, false);
    });
}

formNewPlace.addEventListener("submit", addNewCard);

// Открытие попапа с картинкой

function openImagePopup({ name, link }) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openModal(popupImage);
}

// Валидация форм

enableValidation(validationConfig);
