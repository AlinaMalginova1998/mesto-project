// кнопки страницы
const editProfileInfoButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// элементы страницы
const cardsContainer = document.querySelector(".cards");
const nameElement = document.querySelector(".profile__name");
const descriptionElement = document.querySelector(".profile__description");

// модальное окно редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit-profile");
const exitProfileEdit = popupProfileEdit.querySelector(".popup__exit-button");
const formProfileEdit = popupProfileEdit.querySelector(
  ".popup__form-container"
);
const nameInput = popupProfileEdit.querySelector(".popup__input_el_name");
const discriptionInput = popupProfileEdit.querySelector(
  ".popup__input_el_description"
);

// модальное окно добавления новой карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
const exitAddCard = popupAddCard.querySelector(".popup__exit-button");
const formAddCard = popupAddCard.querySelector(".popup__form-container");
const placeInput = popupAddCard.querySelector(".popup__input_el_place-name");
const linkInput = popupAddCard.querySelector(".popup__input_el_link");

// модальное окно просмотра изображения
const popupViewCard = document.querySelector(".popup_type_view-card");
const exitViewCard = popupViewCard.querySelector(".popup__exit-button");
const imageViewCard = popupViewCard.querySelector(".popup__image");
const placeNameViewCard = popupViewCard.querySelector(".popup__place-name");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function addNewCard(card) {
  cardsContainer.prepend(card);
}

// -----------модальное окно редактирования профиля----------------
function setInputsValue() {
  nameInput.value = nameElement.textContent;
  discriptionInput.value = descriptionElement.textContent;
}

function submitProfileInfo(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = discriptionInput.value;
}

editProfileInfoButton.addEventListener("click", function () {
  openPopup(popupProfileEdit);
  setInputsValue();
});

formProfileEdit.addEventListener("submit", function (evt) {
  submitProfileInfo(evt);
  closePopup(popupProfileEdit);
});

exitProfileEdit.addEventListener("click", function () {
  closePopup(popupProfileEdit);
});

//---------------модальное окно добавления новой карточки--------------
function resetFormAddCard() {
  formAddCard.reset();
}

function submitNewCard(evt) {
  evt.preventDefault();
  if (!placeInput.value || !linkInput.value) return;
  addNewCard(createCard(placeInput.value, linkInput.value));
}

addNewCardButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  resetFormAddCard();
});

formAddCard.addEventListener("submit", function (evt) {
  submitNewCard(evt);
  closePopup(popupAddCard);
});

exitAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

//---------------модальное окно просмотра карточки----------------
exitViewCard.addEventListener("click", function () {
  closePopup(popupViewCard);
});

// --------------------------- СОЗДАНИЕ КАРТОЧКИ ------------------------------

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").setAttribute("src", link);
  cardElement.querySelector(".card__image").setAttribute("alt", name);

  cardElement.querySelector(".card__place-name").textContent = name;

  function deleteCard() {
    this.closest(".card").remove();
  }

  function viewCard() {
    imageViewCard.setAttribute("src", link);
    imageViewCard.setAttribute("alt", name);
    placeNameViewCard.textContent = name;
    openPopup(popupViewCard);
  }

  // кнопка удаления
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  // окно просмотра изображения
  cardElement.querySelector(".card__image").addEventListener("click", viewCard);

  // лайк
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function () {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    });

  return cardElement;
}

// ---------------------------- НАЧАЛЬНЫЕ КАРТОЧКИ -----------------------------

function createInitialCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const card = initialCards[i];
    addNewCard(createCard(card.name, card.link));
  }
}

// ------------- выполняются с запуском страницы -----------

createInitialCards(initialCards);
