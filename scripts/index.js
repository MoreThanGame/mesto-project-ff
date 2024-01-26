// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");

const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

function addCard(cardData) {
  const { nameValue, linkValue, deleteCard } = cardData;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = nameValue;
  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__image").alt = `Фото ${nameValue}`;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach((element) => {
  const newCard = addCard({
    nameValue: element.name,
    linkValue: element.link,
    deleteCard: deleteCard,
  });

  placesList.append(newCard);
  
});

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
