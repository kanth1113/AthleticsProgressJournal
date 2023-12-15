import { DOTW } from "./../config.js";
import View from "./View.js";

class ProgramView extends View {
  _parentElement = document.querySelector(".programs");
  _data;
  _overlay = document.querySelector(".overlay");

  constructor() {
    super();
    this._addLocalHandlers();
  }

  addHandlerRenderPrograms(callback) {
    window.addEventListener("load", callback);
  }
  addHandlerChangeDisplayedDay(callback) {
    // prettier-ignore
    this._parentElement.addEventListener("click", this._changeDisplayedDay.bind(this, callback));
  }
  addHandlerDeleteProgram(callback) {
    // prettier-ignore
    this._parentElement.addEventListener("click", this._deleteProgram.bind(this, callback));
  }

  _changeDisplayedDay(callback, event) {
    if (!event.target.closest(".program--weekday-btn")) return;

    const btn = event.target.closest(".program--weekday-btn");
    // Use DOM traversal to find current dayoftheweek and the program on which the button was clicked
    const day = btn.parentElement.querySelector(
      ".program--weekday-day"
    ).textContent;
    const program = btn.closest(".program").dataset.programname;

    // Get the desired direction from the DOM data
    const direction = +btn.dataset.newday;
    callback(day, direction, program);
  }

  _openSettings(event) {
    if (!event.target.closest(".program--header-settings-btn")) return;

    const btn = event.target.closest(".program--header-settings-btn");
    const modal = btn
      .closest(".program--header")
      .querySelector(".program--settings-modal");

    modal.classList.remove("hidden");
  }

  _addLocalHandlers() {
    this._parentElement.addEventListener(
      "click",
      this._openSettings.bind(this)
    );
  }

  _deleteProgram(callback, event) {
    // Close modal when cancel is clicked
    if (event.target.closest(".program--settings-cancel-btn"))
      event.target.closest(".program--settings-modal").classList.add("hidden");
    // Guard Clause
    if (!event.target.closest(".program--settings-confirm-btn")) return;

    // Use DOM traversal to find the input
    const input = event.target
      .closest(".program--settings-modal")
      .querySelector(".program--settings-delete-input");
    console.log(input);

    if (input.value === "abracadabra") {
      const program = event.target.closest(".program").dataset.programname;
      callback(program);
    } else {
      const html = `
      <span style="color: red; display:block;">Please type 'abracadabra' (case sensitive)</span>
      `;
      input.insertAdjacentHTML("beforebegin", html);
    }
  }

  _generateHTML() {
    // Put the data into a shorter variable
    const d = this._data;

    // Get today's date
    const t = new Date();
    const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    // String version of the day of the week
    const weekday = DOTW[today.getDay()];

    let html = "";

    for (const [key, value] of Object.entries(d)) {
      const dayNumber = d[`${key}`].dayDisplayed;
      let weekday;
      for (let i = 0; i < DOTW.length; i++) {
        if (d[`${key}`][`${DOTW[i]}`].dayNum === dayNumber) weekday = DOTW[i];
      }

      const day = value[`${weekday}`];
      html += `
        <div class="program" data-programname="${d[`${key}`].name}">
          <div class="program--header">
            <div class="program--header-title">${value.name}</div>
            <div class="program--header-settings">
              <button class="program--header-settings-btn">...</button>
            </div>
            <div class="program--settings-modal hidden">
              <span class="program--settings-modal-abracadabra">Type 'abracadabra' to delete this program</span>
              <input placeholder="abracadabra" class="program--settings-delete-input">
              <div class="program--settings-modal-cc">
                <button class="program--settings-confirm-btn">Confirm</button>
                <button class="program--settings-cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
          
          <div class="program--weekday">
            <button data-newday="-1" class="program--weekday-btn">
              &#8592;
            </button>
            <div class="program--weekday-day">${day.day}</div>
            <button data-newday="1" class="program--weekday-btn">
              &#8594;
            </button>
          </div>
          <div class="workout">
            <div class="workout--guide">
              <span class="workout--guide-name">Exercise Name</span>
              <div class="workout--guide-sets">
                <span class="workout--guide-set">Set 1</span>
                <span class="workout--guide-set">Set 2</span>
                <span class="workout--guide-set">Set 3</span>
                <span class="workout--guide-set">Set 4</span>
              </div>
            </div>
            ${this._generateExerciseHTML(day)}
          </div>
        </div>
        `;
    }
    return html;
  }

  _generateExerciseHTML(data) {
    let html = "";
    for (const [key, value] of Object.entries(data)) {
      if (key === "day" || key === "dayNum") continue;
      html += `
        <div class="exercise">
          <div class="exercise--name">
            <span class="exercise--exercise">${key}</span>
            <!-- // Import last weeks numbers!!!
            <button class="exercise-import">
              Import last week's nums
            </button>
            -->
          </div>
          <div class="exercise--sets">
            <div data-set="1" class="exercise--set">
              <input
                class="exercise--weight"
                type="number"
                placeholder="weight"
                min="0"
              />
              <input
                class="exercise--reps"
                type="number"
                placeholder="reps"
                min="0"
              />
            </div>
            <div data-set="2" class="exercise--set">
              <input
                class="exercise--weight"
                type="number"
                placeholder="weight"
                min="0"
              />
              <input
                class="exercise--reps"
                type="number"
                placeholder="reps"
                min="0"
              />
            </div>
            <div data-set="3" class="exercise--set">
              <input
                class="exercise--weight"
                type="number"
                placeholder="weight"
                min="0"
              />
              <input
                class="exercise--reps"
                type="number"
                placeholder="reps"
                min="0"
              />
            </div>
            <div data-set="4" class="exercise--set">
              <input
                class="exercise--weight"
                type="number"
                placeholder="weight"
                min="0"
              />
              <input
                class="exercise--reps"
                type="number"
                placeholder="reps"
                min="0"
              />
            </div>
          </div>
        </div>
      `;
    }
    return html;
  }
}
export default new ProgramView();
