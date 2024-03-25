// Добавление карточек из массива

export function addCard(cardData) {
  const { nameValue, linkValue, deleteCard } = cardData;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = nameValue;
  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__image").alt = `Фото ${nameValue}`;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  return cardElement;
}

// Удаление карточек

export const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

// Лайк карточки

export function toggleLike(likeButton) {
  if (likeButton && likeButton.classList) {
    if (likeButton.classList.contains("card__like-button")) {
      likeButton.classList.toggle("card__like-button_is-active");
    }
  }
}
