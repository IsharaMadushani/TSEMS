const initState = {
  addWorkerError: null,
  workers: []
};

const workerReducer = (state = initState, action) => {
  switch (action.type) {
    case "REMOVE_WORKER":
      return state;

    case "EDIT_WORKER":
      return state;
      
    case "ADD_WORKER":
      return {...state, addWorkerError: "success"};

    case 'ADD_WORKER_ERROR':
      return {...state, addWorkerError: action.err.message};
      
    case 'SET_ADD_WORKER_STATE':
      return {...state, addWorkerError: null};
      
    case "FETCH_WORKERS":
      return {...state, workers: action.data};
      
    case "FETCH_WORKER":
      return {...state, worker: action.data};

    case "FETCH_ASSIGNED_SUPERVISORS":
      return {...state, assignedSupervisors: JSON.parse(action.data)};

    case "FETCH_ALL_ASSIGNED_WORKERS": //fetch all workers who have assigned supervisors
      return {...state, assignedWorkers: action.data};

    case "ASSIGN_SUPERVISOR":
      return state;

    case "ASSIGN_WORKER":
      return state;

    case "REMOVE_ASSIGNED_SUPERVISOR":
      return state;

    case "REMOVE_ASSIGNED_WORKER":
      return state;

    case "FETCH_UNREGISTERED_WORKERS":
      return {...state, unregisteredWorkers: action.data};
      
    case "FETCH_WORKER_STATISTICS":
      return {...state, workerStatistics: action.data};

    case "RESTORE_WORKER":
      return state;

    case "FETCH_UNREGISTERED_WORKER":
      return {...state, unregisteredWorker: action.data};
  }
  return state;
};

export default workerReducer;
