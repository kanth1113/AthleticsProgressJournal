import View from "./View.js";

class CreateProgramView extends View {
  _data = {};
  _parentElement = document.querySelector(".modal");
  _openModalBtn = document.querySelector(".open-modal-btn");
  _closeModalBtn = document.querySelector(".close-modal-btn");

  _overlay = document.querySelector(".overlay");
  _form = document.querySelector(".modal--form");
  _submitBtn = document.querySelector(".modal--form-submit");
  _addExerciseBtn = document.querySelectorAll(".modal--add");

  constructor() {
    super();
    this._addLocalHandlers();
  }

  addHandlerCreateProgram(callback) {
    // prettier-ignore
    this._submitBtn.addEventListener("click", this._createProgram.bind(this, callback));
  }

  _createProgram(callback) {
    // Get the form data
    const dataArray = [...new FormData(this._form)];
    const data = Object.fromEntries(dataArray);
    callback(data);
  }

  _closeModal(event) {
    this._parentElement.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  _openModal() {
    this._parentElement.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _addExercise(event) {
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
    /* The elements that these event listener are attached too are deleted then dynamically recreated
     * Because of this event bubbling must be used on an element that isn't deleted so the
     * Handlers don't get deleted
     */
    this._addExerciseBtn.forEach((el) =>
      el.addEventListener("click", this._addExercise.bind(this))
    );
    this._closeModalBtn.addEventListener("click", this._closeModal.bind(this));

    this._openModalBtn.addEventListener("click", this._openModal.bind(this));
  }

  _generateHTML() {
    return `
      <div class="modal--header">
        <h1 class="modal--header-text">Create a New Program</h1>
        <button class="close-modal-btn">X</button>
      </div>
      <form class="modal--form">
        <div class="modal--form-name">
          <span>Program Name</span>
          <div class="modal--form-namesub">
            <input
              class="modal--form-name-input"
              name="programname"
              placeholder="Name of Program"
            />
          </div>
        </div>
        <br />
        <div class="modal--form-day modal--form-monday">
          <span>Monday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="monday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="monday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-tuesday">
          <span>Tuesday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="tuesday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="tuesday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-wednesday">
          <span>Wednesday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="wednesday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="wednesday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-thursday">
          <span>Thursday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="thursday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="thursday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-friday">
          <span>Friday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="friday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="friday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-saturday">
          <span>Saturday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="saturday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="saturday" class="modal--add">
            +
          </button>
        </div>

        <div class="modal--form-day modal--form-sunday">
          <span>Sunday</span>
          <div class="modal--form-exerise">
            <input
              class="modal--form-input"
              name="sunday-1"
              placeholder="Name of Exercise"
            />
          </div>
          <button type="button" data-day="sunday" class="modal--add">
            +
          </button>
        </div>
        <button type="submit" class="modal--form-submit">Create</button>
      </form>
    `;
  }
}
export default new CreateProgramView();
