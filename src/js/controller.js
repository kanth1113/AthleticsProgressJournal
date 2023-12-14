import * as model from "./model.js";
import programView from "./views/programView.js";
import createProgramView from "./views/createProgramView.js";

const controllerCreateProgram = function (data) {
  // Get the data from the DOM and create the program object
  model.createProgram(data);
  model.storePrograms();
  // Take the program object and display it on the page
  programView.renderAdd(model.state.userData.programs[`${data.programname}`]);
};

const controllerChangeDisplayedDay = function (data) {};

const init = function () {
  createProgramView.addHandlerCreateProgram(controllerCreateProgram);
  programView.addHandlerChangeDisplayedDay(controllerChangeDisplayedDay);
};
init();
