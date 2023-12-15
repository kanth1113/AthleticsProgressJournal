import * as model from "./model.js";
import programView from "./views/programView.js";
import createProgramView from "./views/createProgramView.js";

const controllerRenderPrograms = function () {
  programView.render(model.state.userData.programs);
};

const controllerCreateProgram = function (data) {
  // Get the data from the DOM and create the program object
  model.createProgram(data);
  model.localStorageStorePrograms();
  // Take the program object and display it on the page
  controllerRenderPrograms();
};

const controllerDeleteProgram = function (program) {
  model.deleteProgram(program);
  controllerRenderPrograms();
};

const controllerChangeDisplayedDay = function (day, direction, program) {
  model.changeDisplayedDay(day, direction, program);
  controllerRenderPrograms();
};

const controllerSaveExerciseData = function (program, day, exercise, sets) {
  model.saveProgramData(program, day, exercise, sets);
};

const init = function () {
  createProgramView.addHandlerCreateProgram(controllerCreateProgram);
  programView.addHandlerRenderPrograms(controllerRenderPrograms);
  programView.addHandlerChangeDisplayedDay(controllerChangeDisplayedDay);
  programView.addHandlerDeleteProgram(controllerDeleteProgram);
  programView.addHandlerSaveExerciseData(controllerSaveExerciseData);
};
init();
