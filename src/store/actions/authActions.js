import * as firebase from 'firebase'
import { webAppUsersRef } from "../../config/firebaseconfig"
import { managementStaffRef } from "../../config/firebaseconfig";
import { departmentHeadRef } from "../../config/firebaseconfig";
import { storageRef } from "../../config/firebaseconfig";

//sign in and check user type (department head/management staff)
export const signIn = credentials => {
  return (dispatch, getState) => {
    firebase
      .auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resp) => {
        departmentHeadRef.once("value").then((snapshot) => {
          var departmentHead = snapshot.child(resp.user.uid).exists()
          if(departmentHead){
            dispatch({ type: "LOGIN_SUCCESS", userType: "departmentHead" });
          }
          else{
            managementStaffRef.once("value").then((snapshot) => {
              var managementStaff = snapshot.child(resp.user.uid).exists()
              if(managementStaff){
                dispatch({ type: "LOGIN_SUCCESS", userType: "managementStaff" });
              }
              else{
                dispatch({ type: "LOGIN_ERROR"});
              }
            })
          }
        })
        // dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

//signout
export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=> {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}

//check the user type (department head/management staff)
export const getUserType = (uid) => {
  return (dispatch, getState) => {
    departmentHeadRef.once("value").then((snapshot) => {
      var departmentHead = snapshot.child(uid).exists()
      if(departmentHead){
        dispatch({ type: "LOGIN_SUCCESS", userType: "departmentHead" });
      }
      else{
        managementStaffRef.once("value").then((snapshot) => {
          var managementStaff = snapshot.child(uid).exists()
          if(managementStaff){
            dispatch({ type: "LOGIN_SUCCESS", userType: "managementStaff" });
          }
          else{
            dispatch({ type: "VERIFICATION_ERROR"});
          }
        })
      }
    })
  };
};

//check user type and fetch respective user data
export const fetchUserData = (uid) => {
  return (dispatch, getState) => {
    departmentHeadRef.once("value").then((snapshot) => {
      var departmentHead = snapshot.child(uid).exists()
      if(departmentHead){
        departmentHeadRef.child(uid).on("value", snapshot => {
          dispatch({
            type: "FETCH_USER_DATA",
            uid: uid,
            data: snapshot.val()
          });
        })
      }
      else{
        managementStaffRef.once("value").then((snapshot) => {
          var managementStaff = snapshot.child(uid).exists()
          if(managementStaff){
            managementStaffRef.child(uid).on("value", snapshot => {
              dispatch({
                type: "FETCH_USER_DATA",
                uid: uid,
                data: snapshot.val()
              });
            })
          }
          else{
            dispatch({ type: "FETCH_USER_DATA_ERROR"});
          }
        })
      }
    })
  };
}

//reset password by reauthenticating with current password
export const resetPassword = (currentPassword, newPassword) => {
  return (dispatch, getState) => {
    var user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    user.reauthenticateWithCredential(credential).then(() => {
      user.updatePassword(newPassword).then(() => {
        dispatch({
          type: "RESET_PASSWORD_SUCCESS"
        })
      }).catch((err) => {
        dispatch({
          type: "RESET_PASSWORD_ERROR",
          err
        })
      })
    }).catch((err) => {
      dispatch({
        type: "RESET_PASSWORD_ERROR",
        err
      })
    })
  }
}

//change email address by reauthenticating user
export const resetEmail = (userType,currentPassword, newEmail) => {
  return (dispatch, getState) => {
    var user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    user.reauthenticateWithCredential(credential).then(() => {
      user.updateEmail(newEmail).then(() => {
        webAppUsersRef.child(userType).child(user.uid).update({email:newEmail})
        dispatch({
          type: "RESET_EMAIL_SUCCESS"
        })
      }).catch((err) => {
        dispatch({
          type: "RESET_EMAIL_ERROR",
          err
        })
      })
    }).catch((err) => {
      dispatch({
        type: "RESET_EMAIL_ERROR",
        err
      })
    })
  }
}

//reset 'reset password state' to null to indate no errors
export const setResetPasswordState = () => {
  return(dispatch,getState) => {
    dispatch({
      type: "SET_RESET_PASSWORD_STATE"
    })
  }
}

//reset 'reset email state' to null to indate no errors
export const setResetEmailState = () => {
  return(dispatch,getState) => {
    dispatch({
      type: "SET_RESET_EMAIL_STATE"
    })
  }
}

//edit user profile and save updates
export const editUserProfile = (uid, userType, user) => {
  return(dispatch, getState) => {
    webAppUsersRef.child(userType).child(uid).update(user)
    dispatch({
      type: "EDIT_USER",
      uid: uid
    })
  }
}

//upload profile picture to firebase storage and update profile picture URL in the database
export const uploadProfilePhoto = (uid,userType,photo) => {
  return(dispatch,getState) => {
    storageRef.child("userProfilePictures").child("webAppUsers").child(userType).child(uid).put(photo).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        webAppUsersRef.child(userType).child(uid).update({profilePictureURL: url})
        dispatch({
          type: "UPLOAD_PROFILE_PHOTO"
        })
      }).catch((err) => {
        dispatch({
          type: "UPLOAD_PROFILE_PHOTO_ERROR",
          err
        })
      }) 
    }).catch((err) => {
      dispatch({
        type: "UPLOAD_PROFILE_PHOTO_ERROR",
        err
      })
    })
  }
}

//reset 'reset upload photo state' to null to indate no errors
export const setUploadPhotoState = () => {
  return(dispatch,getState) => {
    dispatch({
      type: "SET_UPLOAD_PHOTO_STATE"
    })
  }
}

//remove profile photo from firebase storage and update profile picture URL in the database
export const removeProfilePhoto = (uid,userType) => {
  return(dispatch,getState) => {
    storageRef.child("userProfilePictures").child("webAppUsers").child(userType).child(uid).delete().then(() => {
      webAppUsersRef.child(userType).child(uid).update({profilePictureURL: ""})
      dispatch({
        type: "REMOVE_PROFILE_PHOTO"
      })
    })
  }
}

//send reset password email
export const forgotPassword = (email) => {
  return(dispatch,getState) => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      dispatch({
        type: "FORGOT_PASSWORD"
      })
    }).catch((err) => {
      dispatch({
        type:"FORGOT_PASSWORD_ERROR",
        err
      })
    })
  }
}

export const setForgotPasswordState = () => {
  return(dispatch,getState) => {
    dispatch({
      type: "SET_FORGOT_PASSWORD_STATE"
    })
  }
}