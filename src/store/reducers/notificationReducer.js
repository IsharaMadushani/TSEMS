const initState = {}

const notificationReducer = (state = initState, action) => {
    switch(action.type){
        case "FETCH_NOTIFICATIONS":
            return {...state, notifications: action.data, notificationCount: action.count}
        case "DELETE_NOTIFICATION":
            return state
    }
    return state
}

export default notificationReducer