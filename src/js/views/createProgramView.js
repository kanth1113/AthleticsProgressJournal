import View from "./View.js";

class CreateProgramView extends View {
  _data = {};
  _parentElement = document.querySelector(".modal");
  _openModalBtn = document.querySelector(".open-modal-btn");
  _closeModalBtn = document.querySelector(".close-modal-btn");
  _overlay = document.querySelector(".overlay");
  _form = document.querySelector(".modal--form");
  _addExerciseBtn = document.querySelectorAll(".modal--add");

  constructor() {
    super();
    this._addLocalHandlers();
  }

  addHandlerCreateProgram(callback) {
    // prettier-ignore
    this._form.addEventListener("submit",this._createProgram.bind(this, callback));
  }

  _createProgram(callback, event) {
    event.preventDefault();

    // Get the form data
    const dataArray = [...new FormData(this._form)];
    const data = Object.fromEntries(dataArray);

    // Clear the form
    const inputs = Array.from(document.querySelectorAll(".modal--form-input"));
    inputs.forEach((input) => (input.value = ""));

    // Close the modal and reset the form
    this._closeModal();

    // Run the callback function
    callback(data);
  }

  _closeModal() {
    this._parentElement.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  _openModal() {
    this._parentElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _addExercise(event) {
    // Stop form from reloading the page
    event.preventDefault();

    // Use the data in the html to find the day and number corresponding with the + that was clicked
    this._data.day = event.srcElement.dataset.day;
    this._data.number =
      event.srcElement.previousElementSibling.children[0].name.slice(-1);

    // Render the new input box right before the + button
    event.srcElement.insertAdjacentHTML(
      "beforebegin",
      `
        <div class="modal--form-exerise">
          <input class="modal--form-input" name="${this._data.day}-${
        +this._data.number + 1
      }" placeholder="Name of Exercise" />
        </div>
      `
    );
  }

  _addLocalHandlers() {
    this._addExerciseBtn.forEach((el) =>
      el.addEventListener("click", this._addExercise.bind(this))
    );
    this._closeModalBtn.addEventListener("click", this._closeModal.bind(this));
    this._openModalBtn.addEventListener("click", this._openModal.bind(this));
  }
}
export default new CreateProgramView();
