(()=>{"use strict";var e=function(e){e.target.closest(".card").remove()};function t(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}var r=document.querySelector(".content").querySelector(".places__list"),c=document.querySelector(".profile__title"),p=c.textContent,u=document.querySelector(".profile__description"),a=u.textContent,d=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),l=document.querySelector(".popup__input_type_name"),s=document.querySelector(".popup__input_type_description"),m=document.querySelector(".popup_type_new-card .popup__input_type_card-name"),_=document.querySelector(".popup_type_new-card .popup__input_type_url"),y=document.querySelector(".popup_type_image"),v=y.querySelector(".popup__image"),f=y.querySelector(".popup__caption"),k=document.querySelectorAll(".popup"),q=document.querySelectorAll(".popup__close"),S=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),L=document.forms["edit-profile"],E=L.elements.name,h=L.elements.description;E.value="Жак-Ив Кусто",h.value="Исследователь океана";var x=document.forms["new-place"];function b(t){var n=function(e){var t=e.name,n=e.link,o=e.deleteCard,r=e.openImagePopup,c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__image");return c.querySelector(".card__title").textContent=t,a.src=n,a.alt="Фото ".concat(t),a.addEventListener("click",(function(){return r({name:t,link:n})})),p.addEventListener("click",o),u.addEventListener("click",(function(){return function(e){e&&e.classList&&e.classList.contains("card__like-button")&&e.classList.toggle("card__like-button_is-active")}(u)})),c}({name:t.name,link:t.link,deleteCard:e,openImagePopup:C});r.append(n)}function C(e){var n=e.name,o=e.link;v.src=o,v.alt=n,f.textContent=n,t(y)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(b),d.addEventListener("click",(function(e){e.target===d&&(E.value=p,h.value=a),t(S)})),i.addEventListener("click",(function(){x.reset(),t(g)})),q.forEach((function(e){e.addEventListener("click",(function(e){n(e.target.closest(".popup"))}))})),k.forEach((function(e){e.addEventListener("click",(function(e){e.target===e.currentTarget&&n(e.target)}))})),L.addEventListener("submit",(function(e){e.preventDefault();var t=l.value,o=s.value;c.textContent=t,u.textContent=o,n(S)})),x.addEventListener("submit",(function(e){e.preventDefault(),b({name:m.value,link:_.value}),n(g)}))})();