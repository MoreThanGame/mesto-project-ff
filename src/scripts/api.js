import { cardNameInput, cardLinkInput, nameInput, jobInput } from "./index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "8cf6ca0a-ca97-4f09-ae7a-8c4a66b375aa",
    "Content-Type": "application/json",
  },
};

export const getUserDataApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос по данным пользователя не выполнен: ", err);
    });
};

export const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log("Данные карточек:", data);
      return data;
    })
    .catch((err) => {
      console.log(
        "Ошибка. Запрос по получению массива карточек не выполнен: ",
        err
      );
    });
};

export const sendUserDataApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((data) => {
      console.log("Данные пользователя обновлены:", data);
      return data;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных пользователя:", err);
    });
};

export const sendNewCardApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:", err);
    });
};

export const deletePopupCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const sendLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка при постановке лайка:", err);
    });
};

export const removeLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((err) => {
      console.log("Ошибка при снятии лайка:", err);
    });
};

export const updateUserAvatarApi = (avatarLinkInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((data) => {
      console.log("Аватар пользователя обновлён:", data);
      return data;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара пользователя:", err);
    });
};
