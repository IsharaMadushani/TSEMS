const initState = {
    addMachineError: null
};
  
  const machineReducer = (state = initState, action) => {
    switch (action.type) {
        case "REMOVE_MACHINE":
            return state;
    
        case "EDIT_MACHINE":
            return state;
            
        case "ADD_MACHINE":
            return {...state, addMachineError: "success"};

        case 'ADD_MACHINE_ERROR':
            return {...state, addMachineError: action.error};
        
        case 'SET_ADD_MACHINE_STATE':
            return {...state, addMachineError: null}; //set error to null
            
        case "FETCH_MACHINES":
            return {...state, machines: action.data};
            
        case "FETCH_MACHINE":
            return {...state, machine: action.data};
  
    }
    return state;
  };
  
  export default machineReducer;
  