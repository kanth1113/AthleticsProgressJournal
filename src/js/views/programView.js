import View from "./View.js";

class ProgramView extends View {
  _parentElement = document.querySelector(".programs");
  _data;

  addHandlerCreateProgram(callback) {
    const btn = document.querySelector(".programs--create");
    btn.addEventListener("click", function (event) {
      callback();
    });
  }

  _generateHTML(_data) {
    return `
      <div class="program">
        <div class="program--header">
          <div class="program--header-title">Program Title</div>
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
          <div class="program--weekday-day">Tuesday</div>
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
          <div class="exercise">
            <!-- Template -->
            <div class="exercise--name">
              <span class="exercise--exercise">Barbell Benchpress</span>
              <!--
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
              <div data-set="3" class="exercise--set"></div>
              <div data-set="4" class="exercise--set"></div>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}
export default new ProgramView();