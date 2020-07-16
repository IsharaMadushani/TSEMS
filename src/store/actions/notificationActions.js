import { notificationRef } from "../../config/firebaseconfig";
import { tasksRef } from "../../config/firebaseconfig";

//fetch all notifications
export const fetchNotifications = () => {
    return (dispatch, getState) => {
        notificationRef.orderByKey().on("value", snapshot => {
          dispatch({
            type: "FETCH_NOTIFICATIONS",
            data: snapshot.val(),
            count: snapshot.numChildren()
          });
        });
      };
}

//delete a notification from the database
export const deleteNotification = (key) => {
  return (dispatch, getState) => {
    notificationRef.child(key).remove()
    dispatch({
      type: "DELETE_NOTIFICATION",
      data: key
    })
  }
}