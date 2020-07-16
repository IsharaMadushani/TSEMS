import workerReducer from "./workerReducer";
import supervisorReducer from "./supervisorReducer";
import managementStaffReducer from "./managementStaffReducer";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer"
import machineReeducer from "./machineReducer"
import notificationReducer from "./notificationReducer";

import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  worker: workerReducer,
  supervisor: supervisorReducer,
  managementStaff : managementStaffReducer,
  tasks: taskReducer,
  machines: machineReeducer,
  notifications: notificationReducer
});

export default rootReducer;
