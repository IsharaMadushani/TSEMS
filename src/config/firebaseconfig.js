import * as firebase from "firebase";

//Your web app's Firebase configuration

//test db
var firebaseConfig = {
  apiKey: "AIzaSyCT4W4PwEWwFXigDhVIP2zkjKceUwvYYbU",
  authDomain: "cbl-emp-mgt.firebaseapp.com",
  databaseURL: "https://cbl-emp-mgt.firebaseio.com",
  projectId: "cbl-emp-mgt",
  storageBucket: "gs://cbl-emp-mgt.appspot.com/",
  messagingSenderId: "86746911346",
  appId: "1:86746911346:web:d82f0b9e091077c465e8eb"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDpF0OO3TVw1lCOgcHS7gdie0FBy6P9NEs",
//   authDomain: "tsems-cbl-doe.firebaseapp.com",
//   databaseURL: "https://tsems-cbl-doe.firebaseio.com",
//   projectId: "tsems-cbl-doe",
//   storageBucket: "tsems-cbl-doe.appspot.com",
//   messagingSenderId: "640788607829"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const secondaryApp = firebase.initializeApp(firebaseConfig, "secondary") //secondary app for adding new users


const databaseRef = firebase.database().ref();
export const workerRef = databaseRef.child("users").child("mobileAppUsers").child("employees"); //worker
export const supervisorRef = databaseRef.child("users").child("mobileAppUsers").child("supervisors"); //supervisor
export const managementStaffRef = databaseRef.child("users").child("webAppUsers").child("managementStaff");
export const departmentHeadRef = databaseRef.child("users").child("webAppUsers").child("departmentHead")
export const allocationsRef = databaseRef.child("allocations")
export const statisticsRef = databaseRef.child("statistics")
export const unregisteredUsersRef = databaseRef.child("unregisteredUsers")
export const webAppUsersRef = databaseRef.child("users").child("webAppUsers")
export const tasksRef = databaseRef.child("tasks")
export const machineRef = databaseRef.child("machines");
export const completedTasksRef = databaseRef.child("completedTaskRefs")
export const taskActivityLogsRef = databaseRef.child("taskActivityLogs")
export const taskAssignmentRef = databaseRef.child("taskAssignments")

// export const notificationRef = databaseRef.child("notifications").child("MeIXXMg4RqOAo6fmXHT5LxFwPFY2")  //"4Go5rG8rDPgsiRZOz7kvm1w31KB2"
export const notificationRef = databaseRef.child("notifications").child("4Go5rG8rDPgsiRZOz7kvm1w31KB2")  //test db


export const storageRef = firebase.storage().ref()

// export const departmentHead = "MeIXXMg4RqOAo6fmXHT5LxFwPFY2" //"4Go5rG8rDPgsiRZOz7kvm1w31KB2"
export const departmentHead = "4Go5rG8rDPgsiRZOz7kvm1w31KB2" //test db

export default firebase;
