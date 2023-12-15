export const state = {
  userData: {
    programs: {},
  },
};

export const createProgram = function (program) {
  // Create data format of a program
  const today = new Date();
  state.userData.programs[`${program.programname}`] = {
    name: program.programname,
    creationDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ),
    monday: {
      day: "Monday",
      dayNum: 1,
    },
    tuesday: {
      day: "Tuesday",
      dayNum: 2,
    },
    wednesday: {
      day: "Wednesday",
      dayNum: 3,
    },
    thursday: {
      day: "Thursday",
      dayNum: 4,
    },
    friday: {
      day: "Friday",
      dayNum: 5,
    },
    saturday: {
      day: "Saturday",
      dayNum: 6,
    },
    sunday: {
      day: "Sunday",
      dayNum: 0,
    },
  };

  for (const [key, value] of Object.entries(program)) {
    // Get the weekday of the workout from
    const weekday = key.slice(0, key.length - 2);

    // Put the exercises into the programs object
    if (weekday.includes("day") && value !== "")
      state.userData.programs[`${program.programname}`][`${weekday}`][
        `${value}`
      ] = [];
  }
  // state.userData.programs[`${}`]
};

export const changeDisplayedDay = function (day, direction, program) {
  for (const [key, value] of Object.entries(state.userData.programs)) {
    if (key !== program) continue;
    state.userData.programs[`${key}`].dayDisplayed += direction;
    if (state.userData.programs[`${key}`].dayDisplayed === 7)
      state.userData.programs[`${key}`].dayDisplayed = 0;
    if (state.userData.programs[`${key}`].dayDisplayed === -1)
      state.userData.programs[`${key}`].dayDisplayed = 6;
  }
};

export const storePrograms = function () {
  localStorage.setItem("programs", JSON.stringify(state.userData.programs));
  init();
};

export const deleteProgram = function (program) {
  delete state.userData.programs[`${program}`];
  console.log(state.userData.programs);
  storePrograms();
};

const init = function () {
  const storage = localStorage.getItem("programs");
  if (storage) state.userData.programs = JSON.parse(storage);

  // Reset dayDisplayed to today
  for (const [key, value] of Object.entries(state.userData.programs)) {
    const today = new Date();
    state.userData.programs[`${key}`].dayDisplayed = today.getDay();
  }
};
init();
