// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button');

const deleteCard = (element) => {
    element.target.parentElement.remove();
}

function addCard(nameValue, linkValue, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;

    placesList.append(cardElement);
    deleteButton.addEventListener('click', deleteCard);
}

initialCards.forEach(element => {
    addCard(element.name, element.link, deleteCard);
});

// addButton.addEventListener('click', function() {
//     const name = document.querySelector('.popup__input_type_card-name');
//     const link = document.querySelector('.popup__input_type_url');

//     addCard(name.value, link.value);
//     name.value = '';
//     link.value = '';
// });

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

