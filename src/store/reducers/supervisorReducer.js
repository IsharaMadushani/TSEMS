const initState = {
    supervisors: []
  };
  
  const supervisorReducer = (state = initState, action) => {
    switch (action.type) {
      case "REMOVE_SUPERVISOR":
        return state;
        
      case "EDIT_SUPERVISOR":
        return state;
        
      case "ADD_SUPERVISOR":
        return {...state, addSupervisorError: "success"};
        
      case 'ADD_SUPERVISOR_ERROR':
        return {...state, addSupervisorError: action.err.message};
        
      case 'SET_ADD_SUPERVISOR_STATE':
        return {...state, addSupervisorError: null};
        
      case "FETCH_SUPERVISORS":
        return {...state, supervisors: action.data};
        
      case "FETCH_SUPERVISOR":
        return { ...state, supervisor: action.data};

      case "FETCH_ASSIGNED_WORKERS":
        return {...state, assignedWorkers: JSON.parse(action.data)}; 

      case "FETCH_ALL_ASSIGNED_SUPERVISORS": //fetch all supervisors who have assigned workers
        return {...state, assignedSupervisors: action.data};

      case "FETCH_UNREGISTERED_SUPERVISORS":
        return {...state, unregisteredSupervisors: action.data};

      case "FETCH_SUPERVISOR_STATISTICS":
        return {...state, supervisorStatistics: action.data};

      case "RESTORE_SUPERVISOR":
        return state;

      case "FETCH_UNREGISTERED_SUPERVISOR":
        return { ...state, unregisteredSupervisor: action.data};
    }
    return state;
  };
  
  export default supervisorReducer;
  