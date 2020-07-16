const initState = {
  authError: null,
  signedIn: false,
  resetPasswordError: null,
  uploadPhotoError: null,
  resetEmailError: null,
  forgotPasswordError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: "Login Failed" };
      break;

    case "VERIFICATION_ERROR": //usertype fail
      return { state };
      break;

    case "LOGIN_SUCCESS":
      return { ...state, authError: null, signedIn: true, userType: action.userType };
      break;

    case "SIGNOUT_SUCCESS":
      return { ...state, authError: null, signedIn: false, userType: null };
      break;

    case "FETCH_USER_DATA":
      return { ...state, user: action.data };
      break;

    case "FETCH_USER_DATA_ERROR":
      return { ...state, user: "user does not exist" };
      break;

    case "RESET_PASSWORD_SUCCESS":
      return { ...state, resetPasswordError: "success" };
      break;

    case "RESET_PASSWORD_ERROR":
      return { ...state, resetPasswordError: action.err.message };
      break;

    case "SET_RESET_PASSWORD_STATE":
      return { ...state, resetPasswordError: null };
      break;

    case "RESET_EMAIL_SUCCESS":
      return { ...state, resetEmailError: "success" };
      break;

    case "RESET_EMAIL_ERROR":
      return { ...state, resetEmailError: action.err.message };
      break;

    case "SET_RESET_EMAIL_STATE":
      return { ...state, resetEmailError: null };
      break;

    case "EDIT_USER":
      return { ...state, editUserError: "success" };
      break;

    case "EDIT_USER_ERROR":
      return { ...state, editUserError: action.err.message };
      break;

    case "UPLOAD_PROFILE_PHOTO":
      return { ...state, uploadPhotoError:"success" };
      break;

    case "REMOVE_PROFILE_PHOTO":
      return { ...state, uploadPhotoError:"success"};
      break;

    case "UPLOAD_PROFILE_PHOTO_ERROR":
      return { ...state, uploadPhotoError: action.err.message };
      break;

    case "SET_UPLOAD_PHOTO_STATE":
      return { ...state, uploadPhotoError: null };
      break;

    case "FORGOT_PASSWORD":
      return { ...state, forgotPasswordError: "success" };
      break;

    case "FORGOT_PASSWORD_ERROR":
      return { ...state, forgotPasswordError: action.err.message };
      break;

    case "SET_FORGOT_PASSWORD_STATE":
      return { ...state, forgotPasswordError: null };
      break;
      
    default:
      return state;
  }
};

export default authReducer;
