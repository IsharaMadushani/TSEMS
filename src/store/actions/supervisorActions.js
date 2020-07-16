import { secondaryApp } from "../../config/firebaseconfig";
import { supervisorRef } from "../../config/firebaseconfig";
import { statisticsRef } from "../../config/firebaseconfig"
import { allocationsRef } from "../../config/firebaseconfig"
import { unregisteredUsersRef } from "../../config/firebaseconfig"
import { notificationRef } from "../../config/firebaseconfig";

import { departmentHead } from "../../config/firebaseconfig";

//remove current supervisor and add to unregistered users
export const removeSupervisor = (id,supervisor,user,uid) => {
  return (dispatch, getState) => {
    var dt = new Date();

    //set notification if staff member is removing the supervisor
    if(uid != departmentHead){
      var notification = {
        date: dt.toLocaleString(),
        title: "Supervisor Unregistered",
        type: "remove",
        userType: "supervisors",
        id: id,
        name: supervisor.firstName + ' ' + supervisor.lastName,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }

    //add to unregistered users
    unregisteredUsersRef.child("mobileAppUsers").child("supervisors").child(id).set({...supervisor, unregisteredAt:dt.toLocaleString()})
    
    //remove from current users
    supervisorRef.child(id).remove();
    dispatch({
      type: "REMOVE_SUPERVISOR",
      id: id
    });
  };
};

//update edited details of supervisor in the database
export const editSupervisor = (id, supervisor, user, uid, supervisorName) => {
  return (dispatch, getState) => {
    supervisorRef.child(id).update(supervisor);
    var dt = new Date();

    //set notification if staff member is editing the supervisor
    if(uid != departmentHead){
      var notification = {
        date: dt.toLocaleString(),
        title: "Supervisor Details Edited",
        type: "edit",
        userType: "supervisors",
        id: id,
        name: supervisorName,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }
    dispatch({
      type: "EDIT_SUPERVISOR",
      id: id
    });
  };
};

//add new supervisor
export const addSupervisor = (supervisor,user,uid) => {
  return (dispatch, getState) => {
    secondaryApp.auth().createUserWithEmailAndPassword(supervisor.email, "123456789")
    .then(resp => {
      // secondaryApp.auth().signOut();
      var dt = new Date();
      var stats = {
        numberOfCurrentTasks: 0,
        numberOfTasksInProgress: 0,
        numberOfTasksOnHold: 0,
        numberOfTasksOverdue:0,
        numberOfTasksPending: 0,
        numberOfTasksUnderReview: 0,
        numberOfTasksToBeRescheduled:0
      }
      supervisorRef.child(resp.user.uid).set({...supervisor, registeredAt:dt.toLocaleString()});
      statisticsRef.child(resp.user.uid).set(stats);
      
      //set notification if staff member is adding the supervisor
      if(uid!= departmentHead){
        var notification = {
          date: dt.toLocaleString(),
          title: "New Supervisor Added",
          type: "add",
          userType: "supervisors",
          id: resp.user.uid,
          name: supervisor.firstName + ' ' + supervisor.lastName,
          user: user.firstName + ' ' + user.lastName,
          uid: uid
        }
        notificationRef.child(dt.valueOf()).set(notification);
      }
    }).then(() => {
      dispatch({
        type: "ADD_SUPERVISOR",
        supervisor: supervisor
      });
    }).catch((err) => {
      dispatch({
        type: "ADD_SUPERVISOR_ERROR",
        err
      })
    })
  };
};

//reset add supervisor state to indicate no errors
export const setAddSupervisorState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ADD_SUPERVISOR_STATE",
    })
  }
}

//fetch all supervisors
export const fetchSupervisors = () => {
  return (dispatch, getState) => {
    supervisorRef.on("value", snapshot => {
      dispatch({
        type: "FETCH_SUPERVISORS",
        data: snapshot.val()
      });
    });
  };
};

//fetch details of one supervisor
export const fetchSupervisor = id => {
  return (dispatch, getState) => {
    supervisorRef.child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_SUPERVISOR",
        id: id,
        data: snapshot.val()
      });
    });
  };
};

//fetch list of assigned workers ids of a supervisor
export const fetchAssignedWorkers = (id) => {
  return (dispatch, getState) => {
    allocationsRef.child("employeesToSupervisors").child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_ASSIGNED_WORKERS",
        data: snapshot.val()
      });
    });
  };
};

//fetch list of supervisor IDs who have assigned workers
export const fetchAllAssignedSupervisors = () => {
  return (dispatch, getState) => {
    allocationsRef.child("supervisorsToEmployees").on("value", snapshot => {
      dispatch({
        type: "FETCH_ALL_ASSIGNED_SUPERVISORS",
        data: snapshot.val()
      });
    });
  };
};

//fetch all unregistered supervisors
export const fetchUnregisteredSupervisors = () => {
  return (dispatch, getState) => {
    unregisteredUsersRef.child("mobileAppUsers").child("supervisors").on("value", snapshot => {
      dispatch({
        type: "FETCH_UNREGISTERED_SUPERVISORS",
        data: snapshot.val()
      });
    });
  };
};

//fetch supervisor statistics
export const fetchSupervisorStatistics = (supervisorId) => {
  return(dispatch,getState) => {
    statisticsRef.child(supervisorId).on("value", snapshot => {
      dispatch({
        type: "FETCH_SUPERVISOR_STATISTICS",
        data: snapshot.val()
      })
    })
  }
}

//restore unregistered supervisor as a current user
export const restoreSupervisor = (id,supervisor) => {
  return (dispatch, getState) => {
    var dt = new Date(); 

    //add to current users
    supervisorRef.child(id).set({...supervisor, restoredAt:dt.toLocaleString()}).then(() => {

      //remove from unregistered users
      unregisteredUsersRef.child("mobileAppUsers").child("supervisors").child(id).remove()
      dispatch({
        type: "RESTORE_SUPERVISOR",
        id: id
      });
    })
  };
};

//fetch details of one unregistered supervisor
export const fetchUnregisteredSupervisor = (id) => {
  return(dispatch,getState) => {
    unregisteredUsersRef.child("mobileAppUsers").child("supervisors").child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_UNREGISTERED_SUPERVISOR",
        id: id,
        data: snapshot.val()
      });
    });
  }
}