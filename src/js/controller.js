import * as model from "./model.js";
import programView from "./views/programView.js";
import createProgramView from "./views/createProgramView.js";

const controllerCreateProgram = function (data) {
  console.log(data);
};

const init = function () {
  createProgramView.addHandlerCreateProgram(controllerCreateProgram);
};
init();
