"use strict";

const buttonDontClick = document.querySelector(".button__dontClick");
const textDontClick = document.querySelector(".text__dontClick");

buttonDontClick.addEventListener("click", function () {
  textDontClick.classList.remove("hidden");
  setTimeout(function () {
    textDontClick.textContent = "Hope you enjoyed the song and dance 🤣";
  }, 10000);
});
