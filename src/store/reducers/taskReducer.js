const initState = {}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case "FETCH_TASKS":
            return {...state, tasks: action.data}

        case "FETCH_TASK":
            return {...state, task: action.data}

        case "FETCH_TASK_ACTIVITY_LOGS":
            return {...state, taskActivityLogs: action.data}
        
        case "FETCH_TASK_SUPERVISOR":
            return {...state, supervisor: {...action.data, status:action.status}}
        
        case "FETCH_ASSIGNED_TASKS":
            return {...state, assignedTasks: JSON.parse(action.data)};
        
        case "FETCH_COMPLETED_TASKS":
            return {...state, completedTasks: JSON.parse(action.data)};
    }
    return state
}

export default taskReducer