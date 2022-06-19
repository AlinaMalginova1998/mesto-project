// --------- buttons ---------
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// ---------- elements ---------
const main = document.querySelector(".main");
let cardsContainer = document.querySelector(".cards");
let nameElement = document.querySelector(".profile__name");
let descriptionElement = document.querySelector(".profile__description");

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
  const popupTemplate = document.querySelector("#popup").content;
  const editProfilePopupElement = popupTemplate
    .querySelector(".popup")
    .cloneNode(true);
  const exitPopupButton = editProfilePopupElement.querySelector(
    ".popup__exit-button"
  );
  const saveButton = editProfilePopupElement.querySelector(
    ".popup__save-button"
  );
  const formElement = editProfilePopupElement.querySelector(
    ".popup__form-container"
  );

  // настраиваем элементы модального окна
  editProfilePopupElement.querySelector(".popup__title").textContent =
    "Редактировать профиль";
  saveButton.textContent = "Сохранить";
  let nameInput = editProfilePopupElement.querySelector(
    ".popup__form-container"
  ).firstElementChild;
  let descriptionInput = nameInput.nextElementSibling;

  nameInput.classList.add("popup__input_el_name");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("placeholder", "Введите свое имя");

  descriptionInput.classList.add("popup__input_el_description");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("placeholder", "Напишите немного о себе");

  // заполняем инпуты данными профиля
  editProfilePopupElement.querySelector(".popup__input_el_name").value =
    nameElement.textContent;
  editProfilePopupElement.querySelector(".popup__input_el_description").value =
    descriptionElement.textContent;

  // открываем окно
  editProfilePopupElement.classList.toggle("popup_opened");
  main.append(editProfilePopupElement);

  // описываем работу кнопок
  // кнопка закрытия модального окна
  exitPopupButton.addEventListener("click", function () {
    editProfilePopupElement.classList.toggle("popup_opened");
  });

  // работа формы
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    nameElement.textContent = editProfilePopupElement.querySelector(
      ".popup__input_el_name"
    ).value;
    descriptionElement.textContent = editProfilePopupElement.querySelector(
      ".popup__input_el_description"
    ).value;

    editProfilePopupElement.classList.toggle("popup_opened");
  });
}

// ------------------------ ДОБАВЛЕНИЕ КАРТОЧКИ --------------------------------

function addNewCard() {
  const popupTemplate = document.querySelector("#popup").content;
  const addCardPopupElement = popupTemplate
    .querySelector(".popup")
    .cloneNode(true);
  const exitPopupButton = addCardPopupElement.querySelector(
    ".popup__exit-button"
  );
  const saveButton = addCardPopupElement.querySelector(".popup__save-button");
  const formElement = addCardPopupElement.querySelector(
    ".popup__form-container"
  );

  // настраиваем элементы модального окна
  addCardPopupElement.querySelector(".popup__title").textContent =
    "Новое место";
  saveButton.textContent = "Создать";
  let placeInput = addCardPopupElement.querySelector(
    ".popup__form-container"
  ).firstElementChild;
  let linkInput = placeInput.nextElementSibling;

  placeInput.classList.add("popup__input_el_place");
  placeInput.setAttribute("name", "place");
  placeInput.setAttribute("placeholder", "Название");

  linkInput.classList.add("popup__input_el_link");
  linkInput.setAttribute("name", "link");
  linkInput.setAttribute("placeholder", "Ссылка на картинку");

  // открываем окно
  addCardPopupElement.classList.toggle("popup_opened");
  main.append(addCardPopupElement);

  // описываем работу кнопок
  // кнопка закрытия модального окна
  exitPopupButton.addEventListener("click", function () {
    addCardPopupElement.classList.toggle("popup_opened");
  });

  // работа формы
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (!placeInput.value || !linkInput.value) return;
    createCard(placeInput.value, linkInput.value);
    addCardPopupElement.classList.toggle("popup_opened");
  });
}

// --------------------------- СОЗДАНИЕ КАРТОЧКИ ------------------------------

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", link);
  cardElement.querySelector(".card__image").setAttribute("alt", name);

  cardElement.querySelector(".card__place-name").textContent = name;

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

      const watchCardPopupElement = document.querySelector(".popup");
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
