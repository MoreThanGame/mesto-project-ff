import "../pages/index.css";
import { addCard, deleteCard, toggleLike } from "../components/card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeModalEsc } from "../components/modal.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const nameElement = document.querySelector(".profile__title");
const profileTitleText = nameElement.textContent;
const jobElement = document.querySelector(".profile__description");
const profiledescriptionText = jobElement.textContent;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_card-name"
);
const cardLinkInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_url"
);
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaptionElement = popupImage.querySelector(".popup__caption");
export const popup = document.querySelectorAll(".popup");
const popupCloseButton = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formEditProfile = document.forms["edit-profile"];
const name = formEditProfile.elements["name"];
const description = formEditProfile.elements["description"];
name.value = "Жак-Ив Кусто";
description.value = "Исследователь океана";
const formNewPlace = document.forms["new-place"];

// Добавление массива карточек

initialCards.forEach((element) => {
  const newCard = addCard({
    nameValue: element.name,
    linkValue: element.link,
    deleteCard: deleteCard,
  });
  placesList.append(newCard);
});

// Открыть модальное окно

function openEditPopup(evt) {
  if (evt.target === profileEditButton) {
    name.value = profileTitleText;
    description.value = profiledescriptionText;
  }
  openModal(popupEdit);
}

profileEditButton.addEventListener("click", openEditPopup);

profileAddButton.addEventListener("click", function () {
  formNewPlace.reset();
  openModal(popupNewCard);
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

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  closeModal(popupEdit);
}

formEditProfile.addEventListener("submit", editFormProfileSubmit);

// Добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const cardData = {
    nameValue: cardName,
    linkValue: cardLink,
    deleteCard: deleteCard,
  };
  const newCardElement = addCard(cardData);
  placesList.prepend(newCardElement);
  newCardElement.addEventListener("click", openClickedImagePopup);

  closeModal(popupNewCard);
}

formNewPlace.addEventListener("submit", addNewCard);

// Открытие попапа с картинкой

export function openClickedImagePopup(evt) {
  const clickedElement = evt.target.closest(".card__image");
  if (clickedElement) {
    const link = clickedElement.src;
    const name = clickedElement.alt;
    openImagePopup(link, name);
  }
}

function openImagePopup(link, name) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
  openModal(popupImage);
}
