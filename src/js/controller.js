import * as model from "./model.js";
import programView from "./views/programView.js";

const controllerCreateProgram = function () {
  programView.renderAdd();
};

const init = function () {
  programView.addHandlerCreateProgram(controllerCreateProgram);
  console.log("asdf");
};
init();
