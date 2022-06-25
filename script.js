// кнопки страницы
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// элементы страницы
const cardsContainer = document.querySelector(".cards");
const nameElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");

// --------- данные исходных карточек -----------
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// ----------------------- РЕДАКТИРОВАНИЕ ДАННЫХ -------------------------------

function editProfileInfo() {
  const popup = document.querySelector(".popup_type_edit-profile");
  const exitPopupButton = popup.querySelector(".popup__exit-button");
  const saveButton = popup.querySelector(".popup__save-button");
  const formElement = popup.querySelector(".popup__form-container");

  // заполняем инпуты данными профиля
  popup.querySelector(".popup__input_el_name").value = nameElement.textContent;
  popup.querySelector(".popup__input_el_description").value =
    descriptionElement.textContent;

  // открываем окно
  popup.classList.add("popup_opened");

  // кнопка закрытия модального окна
  exitPopupButton.onclick =  function () {
    popup.classList.remove("popup_opened");
  };

  // кнопка сохранения
  saveButton.onclick = function () {
    nameElement.textContent = popup.querySelector(
      ".popup__input_el_name"
    ).value;
    descriptionElement.textContent = popup.querySelector(
      ".popup__input_el_description"
    ).value;

    popup.classList.remove("popup_opened");
  };

  // работа формы
  formElement.onsubmit = function (evt) {
    evt.preventDefault();
    nameElement.textContent = popup.querySelector(
      ".popup__input_el_name"
    ).value;
    descriptionElement.textContent = popup.querySelector(
      ".popup__input_el_description"
    ).value;

    popup.classList.remove("popup_opened");
  };
}

// ------------------------ ДОБАВЛЕНИЕ КАРТОЧКИ --------------------------------

function addNewCard() {
  const popup = document.querySelector(".popup_type_new-card");
  const exitPopupButton = popup.querySelector(".popup__exit-button");
  const saveButton = popup.querySelector(".popup__save-button");
  const formElement = popup.querySelector(".popup__form-container");

  // очищаем поля ввода
  const placeInput = popup.querySelector(".popup__input_el_place-name");
  const linkInput = popup.querySelector(".popup__input_el_link");
  placeInput.value = "";
  linkInput.value = "";

  // открываем окно
  popup.classList.add("popup_opened");

  // кнопка закрытия модального окна
  exitPopupButton.onclick = function () {
    popup.classList.remove("popup_opened");
  };

  // кнопка сохранения
  saveButton.onclick = function () {
    if (!placeInput.value || !linkInput.value) return;
    createCard(placeInput.value, linkInput.value);
    popup.classList.remove("popup_opened");
  };

  // работа формы
  formElement.onsubmit = function (evt) {
    evt.preventDefault();
    if (!placeInput.value || !linkInput.value) return;
    createCard(placeInput.value, linkInput.value);
    popup.classList.remove("popup_opened");
  };
}

// --------------------------- СОЗДАНИЕ КАРТОЧКИ ------------------------------

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", link);
  cardElement.querySelector(".card__image").setAttribute("alt", name);

  cardElement.querySelector(".card__place-name").textContent = name;

  // кнопка удаления
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });

  // окно просмотра изображения
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function (evt) {
      const imageLink = evt.target.getAttribute("src");
      const imageName = evt.target.getAttribute("alt");

      const watchCardPopupElement = document.querySelector(".popup_type_view-card");
      const exitPopupButton = watchCardPopupElement.querySelector(
        ".popup__exit-button"
      );

      let image = watchCardPopupElement.querySelector(".popup__image");
      image.setAttribute("src", imageLink);
      image.setAttribute("alt", imageName);

      watchCardPopupElement.querySelector(".popup__place-name").textContent =
        imageName;

      watchCardPopupElement.classList.toggle("popup_opened");

      exitPopupButton.addEventListener("click", function () {
        watchCardPopupElement.classList.remove("popup_opened");
      });
    });

  // лайк
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function () {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    });

  cardsContainer.prepend(cardElement);
}

// ---------------------------- НАЧАЛЬНЫЕ КАРТОЧКИ -----------------------------

function createInitialCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    let card = initialCards[i];
    createCard(card.name, card.link);
  }
}

// ---------- обработчики событий --------

editButton.addEventListener("click", editProfileInfo);
addButton.addEventListener("click", addNewCard);

// ------------- выполняются с запуском страницы -----------

createInitialCards(initialCards);
