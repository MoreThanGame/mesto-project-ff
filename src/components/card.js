import { removeLikeApi, sendLikeApi } from "../scripts/api.js";

// Добавление карточек из массива

export function addCard({ data, confirmDeleteCard, openImagePopup, userId }) {
  const { name, link, _id, likes, owner } = data;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageCard = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.dataset.id = _id;
  imageCard.src = link;
  imageCard.alt = `Фото ${name}`;
  likeCountElement.textContent = likes.length;
  imageCard.addEventListener("click", () => openImagePopup({ name, link }));
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", () => toggleLike(likeButton, _id));

  if (owner._id !== userId) {
    deleteButton.classList.add("card__delete-button-hidden");
  } else {
    deleteButton.addEventListener("click", () => confirmDeleteCard(_id));
  }
  return cardElement;
}

// Удаление карточек

export const deleteCard = (id) => {
  const deleteCardElement = document.querySelector(`.card[data-id="${id}"`);
  if (deleteCardElement) {
    deleteCardElement.remove();
  }
};

// Лайк карточки

export function toggleLike(likeButton, cardId) {
  if (!likeButton || !likeButton.classList) return;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    removeLikeApi(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        updateLikeCount(likeButton, updatedCard.likes.length);
      })
      .catch((error) => {
        console.log("Ошибка удаления лайка:", error);
      });
  } else {
    sendLikeApi(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        updateLikeCount(likeButton, updatedCard.likes.length);
      })
      .catch((error) => {
        console.log("Ошибка добавления лайка:", error);
      });
  }
}

function updateLikeCount(likeButton, likeCount) {
  const likeCountElement =
    likeButton.parentElement.querySelector(".card__like-count");
  if (likeCountElement) {
    likeCountElement.textContent = likeCount;
  }
}
