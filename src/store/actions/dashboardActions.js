import { workerRef } from "../../config/firebaseconfig";
import { supervisorRef } from "../../config/firebaseconfig";
import { managementStaffRef } from "../../config/firebaseconfig"
import { tasksRef } from "../../config/firebaseconfig";
import { machineRef } from "../../config/firebaseconfig";
//get no of workers/supervisors/staff/tasks to display in the dashboard
export const getNoOfWorkers = () => {
  return (dispatch, getState) => {
    workerRef.on("value",snapshot => {
      dispatch({
        type: "NO_OF_WORKERS",
        data: snapshot.numChildren()
      });
    });
  };
};

export const getNoOfSupervisors = () => {
  return (dispatch, getState) => {
    supervisorRef.on("value",snapshot => {
      dispatch({
        type: "NO_OF_SUPERVISORS",
        data: snapshot.numChildren()
      });
    });
  };
};

export const getNoOfManagementStaff = () => {
  return (dispatch, getState) => {
    managementStaffRef.on("value",snapshot => {
      dispatch({
        type: "NO_OF_STAFF",
        data: snapshot.numChildren()
      });
    });
  };
};

export const getNoOfTasks = () => {
  return (dispatch, getState) => {
    tasksRef.on("value",snapshot => {
      dispatch({
        type: "NO_OF_TASKS",
        data: snapshot.numChildren()
      });
    });
  };
};

export const getNoOfMachines = () => {
  return (dispatch, getState) => {
    machineRef.on("value",snapshot => {
      dispatch({
        type: "NO_OF_MACHINES",
        data: snapshot.numChildren()
      });
    });
  };
};
