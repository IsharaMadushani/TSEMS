import { secondaryApp } from "../../config/firebaseconfig";
import { managementStaffRef } from "../../config/firebaseconfig";
import { unregisteredUsersRef } from "../../config/firebaseconfig"

//remove management staff from current users and add to unregistered users
export const removeManagementStaff = (id,managementStaff) => {
  return (dispatch, getState) => {
    var dt = new Date();
    
    //add to unregistered users
    unregisteredUsersRef.child("webAppUsers").child("managementStaff").child(id).set({...managementStaff, unregisteredAt:dt.toLocaleString()})
    
    //remove from current users
    managementStaffRef.child(id).remove();
    dispatch({
      type: "REMOVE_MANAGEMENT_STAFF",
      id: id
    });
  };
};

//edit managament staff details and update database
export const editManagementStaff= (id, managementStaff) => {
  return (dispatch, getState) => {
    managementStaffRef.child(id).update(managementStaff);
    dispatch({
      type: "EDIT_MANAGEMENT_STAFF" ,
      id: id
    });
  };
};

//add new mamangenemt staff member with default password 123456789
export const addManagementStaff = managementStaff => {
  return (dispatch, getState) => {
    secondaryApp.auth().createUserWithEmailAndPassword(managementStaff.email, "123456789")
    .then(resp => {
      // secondaryApp.auth().signOut();
      var dt = new Date();
      return managementStaffRef.child(resp.user.uid).set({...managementStaff, registeredAt:dt.toLocaleString()});
    }).then(() => {
      dispatch({
        type: "ADD_MANAGEMENT_STAFF",
        managementStaff: managementStaff
      });
    }).catch((err) => {
      dispatch({
        type: "ADD_MANAGEMENT_STAFF_ERROR",
        err
      })
    })
  };
};

//reset add management staff state to indicate no errors
export const setAddManagementStaffState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ADD_MANAGEMENT_STAFF_STATE",
    })
  }
}

//fetch all management staff
export const fetchManagementStaffs = () => {
  return (dispatch, getState) => {
    managementStaffRef.on("value", snapshot => {
      dispatch({ 
        type: "FETCH_MANAGEMENT_STAFFS",
        data: snapshot.val()
      });
    });
  };
};

//fetch details of one staff member
export const fetchManagementStaff = id => {
  return (dispatch, getState) => {
    managementStaffRef.child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_MANAGEMENT_STAFF",
        id: id,
        data: snapshot.val()
      });
    });
  };
};

//fetch all unregistered management staff data
export const fetchUnregisteredManagementStaffs = () => {
  return (dispatch, getState) => {
    unregisteredUsersRef.child("webAppUsers").child("managementStaff").on("value", snapshot => {
      dispatch({
        type: "FETCH_UNREGISTERED_MANAGEMENTSTAFFS",
        data: snapshot.val()
      });
    });
  };
};

//restore unregistered management staff
export const restoreManagementStaff = (id,managementStaff) => {
  return (dispatch, getState) => {
    var dt = new Date(); 

    //add to current users
    managementStaffRef.child(id).set({...managementStaff, restoredAt:dt.toLocaleString()}).then(() => {

      //remove from unregistered users
      unregisteredUsersRef.child("webAppUsers").child("managementStaff").child(id).remove()
      dispatch({
        type: "RESTORE_MANAGEMENT STAFF",
        id: id
      });
    })
  };
};

//fetch details of one unregistered staff member
export const fetchUnregisteredManagementStaff = (id) => {
  return (dispatch, getState) => {
    unregisteredUsersRef.child("webAppUsers").child("managementStaff").child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_UNREGISTERED_MANAGEMENT_STAFF",
        id: id,
        data: snapshot.val()
      });
    });
  };
}