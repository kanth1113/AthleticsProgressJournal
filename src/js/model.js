export const state = {
  userData: {
    programs: {},
  },
};

export const createProgram = function (program) {
  // Create data format of a program
  const today = new Date();
  state.userData.programs[`${program.programname}`] = {
    dayDisplayed: today.getDay(),
    name: program.programname,
    creationSunday: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() // subtract day of the week to always give sunday as date
    ),
    weekNumber: 1,
    daysOfTheWeek: {
      sunday: {
        day: "Sunday",
        dayNum: 0,
      },
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
    },
  };

  for (const [key, value] of Object.entries(program)) {
    // Get the weekday of the workout from
    const weekday = key.slice(0, key.length - 2);

    // Put the exercises into the programs object
    if (weekday.includes("day") && value !== "") {
      state.userData.programs[`${program.programname}`].daysOfTheWeek[
        `${weekday}`
      ][`${value}`] = {};
    }
  }
  // state.userData.programs[`${}`]
};

export const changeDisplayedDay = function (day, direction, program) {
  for (const [key, value] of Object.entries(state.userData.programs)) {
    if (key !== program) continue;
    value.dayDisplayed += direction;
    // Ensure week doesn't go lower than 1
    if (value.dayDisplayed === 7) {
      value.dayDisplayed = 0;
      value.weekNumber++;
    }
    if (value.dayDisplayed === -1) {
      value.dayDisplayed = 6;
      value.weekNumber--;
    }
    if (value.weekNumber < 1) {
      value.weekNumber = 1;
      value.dayDisplayed = 0;
    }
  }
};

export const localStorageRetrievePrograms = function () {
  const storage = localStorage.getItem("programs");
  if (storage) state.userData.programs = JSON.parse(storage);
};

export const localStorageStorePrograms = function () {
  localStorage.setItem("programs", JSON.stringify(state.userData.programs));
  localStorageRetrievePrograms();
};

export const setDayDisplayed = function () {
  for (const [key, value] of Object.entries(state.userData.programs)) {
    const today = new Date();
    state.userData.programs[`${key}`].dayDisplayed = today.getDay();
  }
};

export const setWeekNumber = function () {
  for (const [key, value] of Object.entries(state.userData.programs)) {
    const weekLength = 86400 * 1000 * 7; // 86400 is seconds in a day
    const creationMS = new Date(value.creationSunday).getTime();
    const nowMS = new Date().getTime();

    value.weekNumber = Math.floor((nowMS - creationMS) / weekLength) + 1;
  }
};

export const deleteProgram = function (program) {
  delete state.userData.programs[`${program}`];
  localStorageStorePrograms();
};

export const saveProgramData = function (program, day, exercise, sets) {
  console.log(state.userData.programs[`${program}`].daysOfTheWeek[`${day}`]);

  const setsDestination =
    state.userData.programs[`${program}`].daysOfTheWeek[`${day}`][
      `${exercise}`
    ];
  console.log(setsDestination);
};

const init = function () {
  // Retrieve the data
  localStorageRetrievePrograms();

  // Reset dayDisplayed to today
  setDayDisplayed();
  setWeekNumber();
};
init();
