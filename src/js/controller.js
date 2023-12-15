import * as model from "./model.js";
import programView from "./views/programView.js";
import createProgramView from "./views/createProgramView.js";

const controllerRenderPrograms = function () {
  programView.render(model.state.userData.programs);
};

const controllerCreateProgram = function (data) {
  // Get the data from the DOM and create the program object
  model.createProgram(data);
  model.storePrograms();
  // Take the program object and display it on the page
  programView.render(model.state.userData.programs);
};

const controllerDeleteProgram = function (program) {
  model.deleteProgram(program);
  programView.render(model.state.userData.programs);
};
const controllerChangeDisplayedDay = function (day, direction, program) {
  model.changeDisplayedDay(day, direction, program);
  programView.render(model.state.userData.programs);
};

const init = function () {
  createProgramView.addHandlerCreateProgram(controllerCreateProgram);
  programView.addHandlerRenderPrograms(controllerRenderPrograms);
  programView.addHandlerChangeDisplayedDay(controllerChangeDisplayedDay);
  programView.addHandlerDeleteProgram(controllerDeleteProgram);
};
init();
