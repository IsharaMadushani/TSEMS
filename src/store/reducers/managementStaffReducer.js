const initState = {
    managementStaffs: []
  };
  
  const managementStaffReducer = (state = initState, action) => {
    switch (action.type) {
      case "REMOVE_MANAGEMENT_STAFF":
        return state;
        
      case "EDIT_MANAGEMENT_STAFF":
        return state;

      case "ADD_MANAGEMENT_STAFF":
        return {...state, addManagementStaffError: "success"};
        
      case 'ADD_MANAGEMENT_STAFF_ERROR':
        return {...state, addManagementStaffError: action.err.message};
        
      case 'SET_ADD_MANAGEMENT_STAFF_STATE':
        return {...state, addManagementStaffError: null};
        
      case "FETCH_MANAGEMENT_STAFFS":
        return {...state, managementStaffs: action.data};
        
      case "FETCH_MANAGEMENT_STAFF":
        return {...state, managementStaff: action.data};

      case "FETCH_UNREGISTERED_MANAGEMENTSTAFFS":
        return {...state, unregisteredManagementStaffs: action.data};
        
      case "RESTORE_MANAGEMENT STAFF":
        return state;

      case "FETCH_UNREGISTERED_MANAGEMENT_STAFF":
        return {...state, unregisteredManagementStaff: action.data};
    }
    return state;
  };
  
  export default managementStaffReducer;
  