import { tasksRef } from "../../config/firebaseconfig";
import { completedTasksRef } from "../../config/firebaseconfig";
import { taskActivityLogsRef } from "../../config/firebaseconfig";
import { supervisorRef } from "../../config/firebaseconfig";
import { unregisteredUsersRef } from "../../config/firebaseconfig"
import { taskAssignmentRef } from "../../config/firebaseconfig";

//fetch all tasks
export const fetchTasks = () => {
    return(dispatch, getState) => {
        tasksRef.on("value", snapshot => {
            dispatch({
                type: "FETCH_TASKS",
                data: snapshot.val()
            })
        })
    }
}

//fetch details of one task
export const fetchTask = (id) => {
    return(dispatch, getState) => {
        tasksRef.child(id).on("value", snapshot => {
            dispatch({
                type: "FETCH_TASK",
                id: id,
                data: snapshot.val()
            })
        })
    }
}

//fetch details of supervisor in charge of a task
export const fetchTaskSupervisor = (supervisorId) => {
    return(dispatch, getState) => {
        supervisorRef.on("value", snapshot => {
            var registered = snapshot.child(supervisorId).exists();
            //if supervisor is a current user
            if(registered){
                supervisorRef.child(supervisorId).on("value", snapshot => {
                    dispatch({
                        type: "FETCH_TASK_SUPERVISOR",
                        data: snapshot.val(),
                        status: "registered"
                    })
                })
            }
            //if supervisor has been unregistered
            else{
                unregisteredUsersRef.child("supervisors").child(supervisorId).on("value", snapshot => {
                    dispatch({
                        type: "FETCH_TASK_SUPERVISOR",
                        data: snapshot.val(),
                        status: "unregistered"
                    })
                })
            }
        })
    }
}

//fetch assigned task list for a employee (supervisor/worker)
export const fetchAssignedTasks = (id) => {
    return(dispatch,getState) => {
      taskAssignmentRef.child(id).on("value", snapshot => {
        dispatch({
          type: "FETCH_ASSIGNED_TASKS",
          data: snapshot.val()
        })
      })
    }
}

//fetch completed task list for a n employee
export const fetchCompletedTasks = (id) => {
    return(dispatch,getState) => {
      completedTasksRef.child(id).on("value", snapshot => {
        dispatch({
          type: "FETCH_COMPLETED_TASKS",
          data: snapshot.val()
        })
      })
    }
}

//fetch activity of a task
export const fetchTaskActivityLogs = (id) => {
    return(dispatch,getState) => {
        taskActivityLogsRef.child(id).on("value", snapshot => {
            dispatch({
                type: "FETCH_TASK_ACTIVITY_LOGS",
                data: snapshot.val()
            })
        })
    }
}