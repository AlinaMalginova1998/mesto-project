let popup = document.querySelector(".popup");
let profileForm = document.querySelector(".popup__form-container");
let exitPopupButton = document.querySelector(".popup__exit-button");
let saveButton = document.querySelector(".popup__save-button");

let editButton = document.querySelector(".profile__edit-button");

let nameElement = document.querySelector(".profile__name");
let descriptionElement = document.querySelector(".profile__description");

let nameInput = document.querySelector(".popup__input_el_name");
let descriptionInput = document.querySelector(".popup__input_el_description");

function closeOrOpenPopup() {
    popup.classList.toggle("popup_opened");
}

exitPopupButton.addEventListener("click", closeOrOpenPopup);

editButton.addEventListener("click", function () {
  descriptionInput.value = descriptionElement.textContent;
  nameInput.value = nameElement.textContent;

  closeOrOpenPopup();
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

saveButton.addEventListener("click", function () {
  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;
  
  closeOrOpenPopup();
});
