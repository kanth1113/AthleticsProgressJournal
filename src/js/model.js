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
    },
    tuesday: {
      day: "Tuesday",
    },
    wednesday: {
      day: "Wednesday",
    },
    thursday: {
      day: "Thursday",
    },
    friday: {
      day: "Friday",
    },
    saturday: {
      day: "Saturday",
    },
    sunday: {
      day: "Sunday",
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
  console.log(state);
  // state.userData.programs[`${}`]
};

export const storePrograms = function () {
  localStorage.setItem("programs", JSON.stringify(state.userData.programs));
};
/*
program object template

program: {
  monday: {
    bench: {
      date: [weight, reps]
      date: [weight, reps]
    }
    pullovers: {
      date: [weight, reps]
      date: [weight, reps]
    }
  tuesday: {
    rows: {
      date: [weight, reps]
      date: [weight, reps]
    }
    trap : {
      date: [weight, reps]
      date: [weight, reps]
    }
  }
}

 */
