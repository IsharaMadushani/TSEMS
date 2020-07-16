import * as firebase from 'firebase'
import { secondaryApp } from "../../config/firebaseconfig";
import { workerRef } from "../../config/firebaseconfig";
import { statisticsRef } from "../../config/firebaseconfig"
import { allocationsRef } from "../../config/firebaseconfig"
import { unregisteredUsersRef } from "../../config/firebaseconfig"
import { taskAssignmentRef } from "../../config/firebaseconfig";
import { notificationRef } from "../../config/firebaseconfig";

import { departmentHead } from "../../config/firebaseconfig";

//remove worker and set notification
export const removeWorker = (id,worker,user,uid) => {
  return (dispatch, getState) => {
    var dt = new Date();
    if(uid != departmentHead){
      var notification = {
        date: dt.toLocaleString(),
        title: "Worker Unregistered",
        type: "remove",
        userType: "workers",
        id: id,
        name: worker.firstName + ' ' + worker.lastName,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }
    
    unregisteredUsersRef.child("mobileAppUsers").child("employees").child(id).set({...worker, unregisteredAt:dt.toLocaleString()}) //workers
    workerRef.child(id).remove();
    dispatch({
      type: "REMOVE_WORKER",
      id: id
    });
  };
};

//update edited worker details and set notification
export const editWorker = (id, worker, user, uid, workerName) => {
  return (dispatch, getState) => {
    workerRef.child(id).update(worker);
    var dt = new Date();
    if(uid != departmentHead) {
      var notification = {
        date: dt.toLocaleString(),
        title: "Worker Details Edited",
        type: "edit",
        userType: "workers",
        id: id,
        name: workerName,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }
    dispatch({
      type: "EDIT_WORKER",
      id: id
    });
  };
};

//add new worker and set notification
export const addWorker = (worker, user, uid) => {
  return (dispatch, getState) => {
    secondaryApp.auth().createUserWithEmailAndPassword(worker.email, "123456789")
    .then(resp => {
      // secondaryApp.auth().signOut();
      var stats = {
        feedbackScore: 0,
        numberOfCompletedTasks: 0,
        numberOfCurrentTasks: 0,
        numberOfIncompletedTasks: 0,
        numberOfTasksInProgress: 0,
        numberOfTasksOnHold: 0,
        numberOfTasksOverdue:0,
        numberOfTasksPending: 0
      }
      var dt = new Date();
      statisticsRef.child(resp.user.uid).set(stats);
      workerRef.child(resp.user.uid).set({...worker, registeredAt:dt.toLocaleString()}); 
      if(uid != departmentHead){
        var notification = {
          date: dt.toLocaleString(),
          title: "New Worker Added",
          type: "add",
          userType: "workers",
          id: resp.user.uid,
          name: worker.firstName + ' ' + worker.lastName,
          user: user.firstName + ' ' + user.lastName,
          uid: uid
        }
        notificationRef.child(dt.valueOf()).set(notification);
      }
    }).then(() => {
      dispatch({
        type: "ADD_WORKER",
        worker: worker,
      })
    }).catch((err) => {
      dispatch({
        type: "ADD_WORKER_ERROR",
        err
      })
    })
  };
};

//set add worker state to indicate no errors
export const setAddWorkerState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ADD_WORKER_STATE",
    })
  }
}

//fetch all workers
export const fetchWorkers = () => {
  return (dispatch, getState) => {
    workerRef.on("value", snapshot => {
      dispatch({
        type: "FETCH_WORKERS",
        data: snapshot.val()
      });
    });
  };
};

//fetch one worker
export const fetchWorker = id => {
  return (dispatch, getState) => {
    workerRef.child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_WORKER",
        id: id,
        data: snapshot.val()
      });
    });
  };
};

//fetch assigned supervisors
export const fetchAssignedSupervisors = (id) => {
  return (dispatch, getState) => {
    allocationsRef.child("supervisorsToEmployees").child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_ASSIGNED_SUPERVISORS",
        data: snapshot.val()
      });
    });
  };
};

//fetch all workers id who have assigned supervisors
export const fetchAllAssignedWorkers = () => {
  return (dispatch, getState) => {
    allocationsRef.child("employeesToSupervisors").on("value", snapshot => {
      dispatch({
        type: "FETCH_ALL_ASSIGNED_WORKERS",
        data: snapshot.val()
      });
    });
  };
};

//assign new supervisor
export const assignSupervisor = (workerId,supervisorId, supervisors) => {
  return (dispatch, getState) => {
    // allocationsRef.child("employeesToSupervisors").child(supervisorId).set(workerId);
    allocationsRef.child("supervisorsToEmployees").child(workerId).set(supervisors);
    dispatch({
      type: "ASSIGN_SUPERVISOR",
      supervisor: supervisorId
    });
  };
};

//assign the worker to the newly assigned supervisor
export const assignWorker = (supervisorId,workerId, workers) => {
  return (dispatch, getState) => {
    allocationsRef.child("employeesToSupervisors").child(supervisorId).set(workers
      );
    dispatch({
      type: "ASSIGN_WORKER",
      worker: workerId
    });
  };
};

//remove assigned supervisor from assigned list
export const removeAssigendSupervisor = (workerId) => {
  return (dispatch, getState) => {
    allocationsRef.child("supervisorsToEmployees").child(workerId).remove();
    dispatch({
      type: "REMOVE_ASSIGNED_SUPERVISOR",
      worker: workerId,
    });
  };
};

//remove worker from the unassigned supervisor's assigned workers list
export const removeAssigendWorker = (supervisorId) => {
  return (dispatch, getState) => {
    allocationsRef.child("employeesToSupervisors").child(supervisorId).remove();
    dispatch({
      type: "REMOVE_ASSIGNED_WORKER",
      supervisor: supervisorId,
    });
  };
};

//fetch all unregistered workers
export const fetchUnregisteredWorkers = () => {
  return (dispatch, getState) => {
    unregisteredUsersRef.child("mobileAppUsers").child("employees").on("value", snapshot => { //workers
      dispatch({
        type: "FETCH_UNREGISTERED_WORKERS",
        data: snapshot.val()
      });
    });
  };
};

//fetch worker statistics
export const fetchWorkerStatistics = (workerId) => {
  return(dispatch,getState) => {
    statisticsRef.child(workerId).on("value", snapshot => {
      dispatch({
        type: "FETCH_WORKER_STATISTICS",
        data: snapshot.val()
      })
    })
  }
}

//restore an unregistered worker
export const restoreWorker = (id,worker) => {
  return (dispatch, getState) => {
    var dt = new Date(); 
    workerRef.child(id).set({...worker, restoredAt:dt.toLocaleString()}).then(() => {
      unregisteredUsersRef.child("mobileAppUsers").child("employees").child(id).remove() //workers
      dispatch({
        type: "RESTORE_WORKER",
        id: id
      });
    })
  };
};

//fetch details of one unregistered worker
export const fetchUnregisteredWorker = (id) => {
  return(dispatch,getState) => {
    unregisteredUsersRef.child("mobileAppUsers").child("employees").child(id).on("value", snapshot => { //workers
      dispatch({
        type: "FETCH_UNREGISTERED_WORKER",
        id: id,
        data: snapshot.val()
      });
    });
  }
}