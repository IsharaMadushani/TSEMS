const initState = {
//   noOfWorkers: null
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "NO_OF_WORKERS":
      return { ...state, noOfWorkers: action.data };

    case "NO_OF_SUPERVISORS":
      return { ...state, noOfSupervisors: action.data };

    case "NO_OF_STAFF":
      return { ...state, noOfStaff: action.data };

    case "NO_OF_TASKS":
      return { ...state, noOfTasks: action.data };

    case "NO_OF_MACHINES":
      return { ...state, noOfMachines: action.data };

    default:
      return state;
  }
};

export default dashboardReducer;
