import "../pages/index.css";
import { addCard, deleteCard, addLike } from "../components/card.js";
import { initialCards } from "./cards.js";
import {
  openPopupEdit,
  closePopupEdit,
  openPopupNewCard,
  closePopupNewCard,
  openModal,
  closeModalEsc,
  closeModal,
} from "../components/modal.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
//const addButton = content.querySelector(".profile__add-button");

// Добавление карточек

initialCards.forEach((element) => {
  const newCard = addCard({
    nameValue: element.name,
    linkValue: element.link,
    deleteCard: deleteCard,
  });
  placesList.append(newCard);
});

// Открыть модальное окно

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", openPopupEdit);

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", openPopupNewCard);

// Закрыть модальное окно

const popupCloseButtonEdit = document.querySelector(
  ".popup_type_edit .popup__close"
);
popupCloseButtonEdit.addEventListener("click", closePopupEdit);

const popupCloseButtonNewCard = document.querySelector(
  ".popup_type_new-card .popup__close"
);
popupCloseButtonNewCard.addEventListener("click", closePopupNewCard);

// Закрытие модального окна через оверлей

const popupOverlayEdit = document.querySelector(".popup_type_edit");
popupOverlayEdit.addEventListener("click", function (evt) {
  if (evt.target === popupOverlayEdit) {
    closePopupEdit();
  }
});

const popupOverlayNewCard = document.querySelector(".popup_type_new-card");
popupOverlayNewCard.addEventListener("click", function (evt) {
  if (evt.target === popupOverlayNewCard) {
    closePopupNewCard();
  }
});

// Редактирование профиля

const formEditProfile = document.forms["edit-profile"];

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameElement = document.querySelector(".profile__title");
  const jobElement = document.querySelector(".profile__description");

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  closePopupEdit();
}

formEditProfile.addEventListener("submit", handleFormSubmit);

// Добавление карточки

const formAddCard = document.forms["new-place"];

const cardNameInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_card-name"
);
const cardLinkInput = document.querySelector(
  ".popup_type_new-card .popup__input_type_url"
);

function addNewCard(evt) {
  evt.preventDefault();

  const cardNameInput = document.querySelector(
    ".popup_type_new-card .popup__input_type_card-name"
  );
  const cardLinkInput = document.querySelector(
    ".popup_type_new-card .popup__input_type_url"
  );
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  placesList.prepend(cardElement);
  closePopupNewCard();
}

formAddCard.addEventListener("submit", addNewCard);

// Лайк карточки

placesList.addEventListener("click", addLike);

// Открытие попапа с картинкой

function openImagePopup(link, name) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaptionElement = popupImage.querySelector(".popup__caption");

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;

  openModal(popupImage);
}

const cardImages = document.querySelectorAll(".card__image");

cardImages.forEach((cardImage) => {
  cardImage.addEventListener("click", function () {
    const link = this.src;
    const name = this.alt;
    openImagePopup(link, name);
  });
});
