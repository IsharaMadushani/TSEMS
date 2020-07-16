import { machineRef } from "../../config/firebaseconfig";
import { notificationRef } from "../../config/firebaseconfig";

import { departmentHead } from "../../config/firebaseconfig";

//remove machine and set notification
export const removeMachine = (id,machine,user,uid) => {
  return (dispatch, getState) => {
    machineRef.child(id).remove();
    var dt = new Date();
    if(uid != departmentHead){
      var notification = {
        date: dt.toLocaleString(),
        title: "Machine Removed",
        type: "remove",
        id: id,
        name: machine.label,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }
    dispatch({
      type: "REMOVE_MACHINE",
      id: id
    });
  };
};

//edit machine and set notification
export const editMachine= (id, machine,user,uid,machineName) => {
  return (dispatch, getState) => {
    machineRef.child(id).update(machine);
    var dt = new Date();
    if(uid != departmentHead) {
      var notification = {
        date: dt.toLocaleString(),
        title: "Machine Details Edited",
        type: "edit",
        userType: "machines",
        id: id,
        name: machineName,
        user: user.firstName + ' ' + user.lastName,
        uid: uid
      }
      notificationRef.child(dt.valueOf()).set(notification);
    }
    dispatch({
      type: "EDIT_MACHINE" ,
      id: id
    });
  };
};

//add machine and set notification
export const addMachine = (machine,user,uid) => {
  return (dispatch, getState) => {
      machineRef.once("value").then((snapshot) => {
        //check if machine id exist
        var machineExists = snapshot.child(machine.machineid).exists();
        //add the machine only if it does not exist
        if(!machineExists){
            machineRef.child(machine.machineid).set({label:machine.label}); 
            var dt = new Date();
            if(uid != departmentHead){
              var notification = {
                date: dt.toLocaleString(),
                title: "New Machine Added",
                type: "add",
                userType: "machines",
                id: machine.machineid,
                name: machine.label,
                user: user.firstName + ' ' + user.lastName,
                uid: uid
              }
              notificationRef.child(dt.valueOf()).set(notification);
            }
            dispatch({
              type: "ADD_MACHINE",
              machine: machine,
            })
          }
          //set error if machine already exists
          else{
              dispatch({
                  type: "ADD_MACHINE_ERROR",
                  error: "The Machine ID is already in-use"
              })
          } 
      })
  };
};

//reset the add machine state to indicate no errors
export const setAddMachineState = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_ADD_MACHINE_STATE",
    })
  }
}

//fetch all machines from the database
export const fetchMachines = () => {
  return (dispatch, getState) => {
    machineRef.on("value", snapshot => {
      dispatch({
        type: "FETCH_MACHINES",
        data: snapshot.val()
      });
    });
  };
};

//fetch details of one machine
export const fetchMachine = id => {
  return (dispatch, getState) => {
    machineRef.child(id).on("value", snapshot => {
      dispatch({
        type: "FETCH_MACHINE",
        id: id,
        data: snapshot.val()
      });
    });
  };
};

