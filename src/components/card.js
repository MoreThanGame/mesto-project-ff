
import { removeLikeApi, sendLikeApi } from "../scripts/api.js";

// Добавление карточек из массива

export function addCard({ name, link, deleteCard, openImagePopup }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageCard = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = name;
  imageCard.src = link;
  imageCard.alt = `Фото ${name}`;
  imageCard.addEventListener("click", () => openImagePopup({ name, link }));

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

// Удаление карточек

export const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
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
