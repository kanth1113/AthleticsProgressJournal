import { DOTW } from "./../config.js";
import View from "./View.js";

class ProgramView extends View {
  _parentElement = document.querySelector(".programs");
  _data;

  constructor() {
    super();
    this._addLocalHandlers();
  }

  addHandlerRenderProgram() {
    window.addEventListener("load", function () {
      //
    });
  }
  addHandlerChangeDisplayedDay(callback) {
    this._parentElement.addEventListener(
      "click",
      this._changeDisplayedDay.bind(this, callback)
    );
  }

  _changeDisplayedDay(callback, event) {
    if (!event.target.closest(".program--weekday-btn")) return;
    console.log(event.target.closest(".program--weekday-btn"));
    callback(event.target.srcElement);
  }

  _addLocalHandlers() {
    //
  }

  _generateHTML() {
    // Put the data into a shorter variable
    const d = this._data;
    console.log(d);

    // Get today's date
    const t = new Date();
    const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());

    // String version of the day of the week
    const weekday = DOTW[today.getDay()];
    const day = d[`${weekday}`];
    return `
      <div class="program">
        <div class="program--header">
          <div class="program--header-title">${d.name}</div>
          <div class="program--header-expand">
            <button data-status="expand" class="program--header-expand-btn">
              <img
                class="program--header-expand-btn-img"
                src="images/expand.png"
              />
            </button>
          </div>
        </div>
        <div class="program--weekday">
          <button data-newday="-1" class="program--weekday-btn">
            &#8592;
          </button>
          <div class="program--weekday-day">${day.day}</div>
          <button data-newday="+1" class="program--weekday-btn">
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

  _generateExerciseHTML(data) {
    let html = "";
    for (const [key, value] of Object.entries(data)) {
      if (key === "day") continue;
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
