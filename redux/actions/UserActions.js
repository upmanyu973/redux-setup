import { globalReset } from './GlobalActions';
import { useSelector } from 'react-redux';
import { Alert, Platform } from 'react-native';
import { storage } from '@/storage/storage';
import { EndPoints } from '@/utils/Axios/EndPoints';
import { GET, PATCH, POST, Uploadfiles } from '@/utils/Axios/Axios';
import { navigate } from '@/routes/RefNavigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Toaster } from '@/components/Toast';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';



export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SIGNUP: 'SIGNUP',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  FORGOT: 'FORGOT',
  FORGOT_REQUEST: 'FORGOT_REQUEST',
  FORGOT_ERROR: 'FORGOT_ERROR',
  FORGOT_SUCCESS: 'FORGOT_SUCCESS',
  UPDATE: 'UPDATE',
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_ERROR: 'UPDATE_ERROR',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPLOAD: 'UPLOAD',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  PHONENUMBER_UPDATE: 'PHONENUMBER_UPDATE',
  PHONENUMBER_UPDATE_REQUEST: 'PHONENUMBER_UPDATE_REQUEST',
  PHONENUMBER_UPDATE_ERROR: 'PHONENUMBER_UPDATE_ERROR',
  PHONENUMBER_UPDATE_SUCCESS: 'PHONENUMBER_UPDATE_SUCCESS',
};

export const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

export const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

export const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

export const logoutRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

export const logoutSuccess = () => ({
  type: TYPES.LOGIN,
  payload: null,
});

export const logoutError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

export const signupRequest = () => ({
  type: TYPES.SIGNUP_REQUEST,
  payload: null,
});
export const signupSuccess = () => ({
  type: TYPES.SIGNUP_SUCCESS,
  payload: null,
});

export const signupError = (error) => ({
  type: TYPES.SIGNUP_ERROR,
  payload: { error },
});

export const forgotRequest = () => ({
  type: TYPES.FORGOT_REQUEST,
  payload: null,
});

export const forgotSuccess = () => ({
  type: TYPES.FORGOT_SUCCESS,
  payload: null,
});

export const forgotError = (error) => ({
  type: TYPES.FORGOT_ERROR,
  payload: { error },
});

export const clearStore = () => {
  storage.clear();
  AsyncStorage.setItem("IsOnboarding", "Done")
  return ({
    type: TYPES.CLEAR_STORE,
    payload: null,
  })
};

export const uploadFileRequest = () => ({
  type: TYPES.UPLOAD_REQUEST,
  payload: null,
});

export const uploadFileSuccess = (data) => {
  return ({
    type: TYPES.UPLOAD_SUCCESS,
    payload: { data },
  })
};


export const uploadFileError = (error) => ({
  type: TYPES.UPLOAD_ERROR,
  payload: { error },
});

export const userDetailsRequest = () => ({
  type: TYPES.UPDATE_REQUEST,
  payload: null,
});

export const userDetailsSuccess = (user) => ({
  type: TYPES.UPDATE_SUCCESS,
  payload: { user },
});
export const PhoneNumberError = (error) => ({
  type: TYPES.PHONENUMBER_UPDATE_ERROR,
  payload: { error },
});

export const PhoneNumberRequest = () => ({
  type: TYPES.PHONENUMBER_UPDATE_REQUEST,
  payload: null,
});

export const PhoneNumberSuccess = (phone) => ({
  type: TYPES.PHONENUMBER_UPDATE_SUCCESS,
  payload: { phone },
});

export const userDetailsError = (error) => ({
  type: TYPES.UPDATE_ERROR,
  payload: { error },
});

export const login = (body) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { endpoint } = EndPoints.login
    const status = await POST(endpoint, body);
    const { res, error } = status
    if (res) {
      const { user } = res.data
      dispatch(loginSuccess(user));
      storage.setItem("Token", user.token[0])
    } else {
      console.log({ error });
      if (error?.message) dispatch(loginError(error?.message));
      else dispatch(loginError("Somethig went wrong..."));

    }
    console.log('login');
  } catch (error) {
    if (error?.message) dispatch(loginError(error?.message));
    else dispatch(loginError("Somethig went wrong..."));
  }
};
export const clearError = () => async (dispatch) => {
  dispatch(loginError(""));
  dispatch(signupError(""));
  dispatch(forgotError(""));
  dispatch(userDetailsError(""));
  dispatch(uploadFileError(""));
  dispatch(PhoneNumberError(""));
};
export const loginasguest = (cancelToken) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const user = await UserController.loginasguest({}, cancelToken);

    dispatch(loginSuccess({
      ...user,
      "userType": "Guest",
      "rememberme": false
    }));
    dispatch(prepareapp(user))
    console.log('Guest');

  } catch (error) {
    if (!axios.isCancel(error))
      dispatch(loginError(error.message));
  }
};

export const SingUpWithGoogle = () => async (dispatch) => {
  dispatch(loginRequest());
  try {
    GoogleSignin.configure({
      webClientId: "377799177344-up41trvrpnnui234thmmqgd1uk978kqv.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId: '377799177344-hovofn8ss092ldjhv2gua9p6kt487647.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      profileImageSize: 120,
    });
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(async (userInfo) => {
          //console.log(JSON.stringify(userInfo))
          const { email, familyName, givenName, id, photo } = userInfo?.user
          // const user = await UserController.socialLogin({
          //   "googleID": id,
          //   "email": email,
          //   "firstName": givenName,
          //   "lastName": familyName,
          //   photo
          // });
          // dispatch(loginSuccess({ ...user,}));
          // dispatch(prepareapp(user))
          console.log('SignUpWithGoogle', userInfo?.user);

        }).catch((error) => {
          dispatch(loginError("Something went wrong with google Sign In"));
          console.log("ERROR IS: " + JSON.stringify(error));
          // if ([401, 400].includes(error.status)) dispatch(loginError(error.message));
        })
      }
    })
  } catch (error) {
    dispatch(loginError(error.message));
    //console.log(error);
  }
};

export const signup = (body, func) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const { endpoint } = EndPoints.createAccount
    const status = await POST(endpoint, body);
    const { res, error } = status
    console.log(res)
    if (res) {
      Toaster(res.data.message)
      dispatch(signupSuccess());
      // storage.setItem("Token", res?.data?.token)
      func()
    } else {
      dispatch(signupError(error.message));

    }
  } catch (error) {
    if (!axios.isCancel(error))
      dispatch(signupError(error.message));
  }
};
export const usernameCheck = (body, Fn) => async (dispatch) => {
  try {
    const { endpoint } = EndPoints.usernameCheck
    const status = await GET(endpoint, {}, body);
    const { res, error } = status
    Fn(error?.message)
  } catch (error) {
    Fn(error?.message)

  }
};
export const verification = (params, user, func) => async (dispatch) => {
  try {
    const res = await UserController.verification(params);
    func(true)
    dispatch(loginSuccess({ ...user, "isVerified": true }));
    dispatch(prepareapp(user))
    console.log('verification');

  } catch (error) {
    func(false)
    if (!axios.isCancel(error))
      dispatch(signupError(error.message));
  }
};

export const updateUserDetails = (body, callback, setUplaodingprogress) => async (dispatch) => {
  dispatch(userDetailsRequest());
  try {
    const { endpoint, header } = EndPoints.updateUserProfile
    // console.log(body);
    const status = await Uploadfiles("PATCH", endpoint, body, header, setUplaodingprogress)
    console.log({ status });
    const { res, error } = status
    callback({ res, error })

    // }
    if (res) {
      dispatch(userDetailsSuccess(res?.user));
      storage.setItem("Token", res?.user?.token[0])
    } else {
      dispatch(userDetailsError(error?.message));
    }
  } catch (error) {
    console.log({ error });
    callback(false)
    dispatch(userDetailsError("Oops!! something went wrong..."));
  }
}

// export const AppleLogin = () => async (dispatch) => {
//   dispatch(loginRequest());
//   if (Platform.OS == 'ios') {
//     try {
//       const appleAuthRequestResponse = await appleAuth.performRequest({
//         requestedOperation: appleAuth.Operation.LOGIN,
//         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//       });
//       const { email, user, identityToken } = appleAuthRequestResponse
//       const { familyName, givenName } = appleAuthRequestResponse.fullName
//       const data = await UserController.socialLogin({
//         "appleID": identityToken,
//         "email": email,
//         "firstName": givenName,
//         "lastName": familyName
//       });
//       dispatch(loginSuccess({ ...data, "rememberme": true }));
//       dispatch(prepareapp(user))
//       console.log('apple login');

//     } catch (error) {
//       if (error && error.message) {
//         // console.log(error);
//         switch (error.message) {
//           case appleAuth.Error.NOT_CONFIGURED:
//             //console.log("appleAuthAndroid not configured yet.");
//             dispatch(loginError("Something went wrong with apple Sign In"));
//             break;
//           case appleAuth.Error.SIGNIN_FAILED:
//             dispatch(loginError("Apple signin failed."));
//             //console.log("Apple signin failed.");
//             break;
//           case appleAuth.Error.SIGNIN_CANCELLED:
//             dispatch(loginError(""));

//             //console.log("User cancelled Apple signin.");
//             break;
//           default:
//             if ([401, 400].includes(error.status)) dispatch(loginError(error.message));
//             else dispatch(loginError("Something went wrong with apple Sign In"));
//             break;
//         }
//       }
//     }

//   } else {
//     try {
//       appleAuthAndroid.configure({
//         clientId: "com.fboprops.client-android",
//         redirectUri: "https://fboprops.com/",
//         scope: appleAuthAndroid.Scope.ALL,
//         responseType: appleAuthAndroid.ResponseType.ALL,
//       });

//       const response = await appleAuthAndroid.signIn();
//       if (response) {
//         const id_token = response.id_token;
//         const user = response.user;
//         const data = await UserController.socialLogin({
//           "appleID": id_token,
//           "firstName": user?.name?.firstName,
//           "lastName": user?.name?.lastName
//         });
//         dispatch(loginSuccess({ ...data, "rememberme": true }));
//         dispatch(prepareapp(data))
//         console.log('apple android');

//       }
//     } catch (error) {
//       if (error && error.message) {
//         switch (error.message) {
//           case appleAuthAndroid.Error.NOT_CONFIGURED:
//             //console.log("appleAuthAndroid not configured yet.");
//             dispatch(loginError("Something went wrong with apple Sign In"));
//             break;
//           case appleAuthAndroid.Error.SIGNIN_FAILED:
//             dispatch(loginError("Apple signin failed."));
//             //console.log("Apple signin failed.");
//             break;
//           case appleAuthAndroid.Error.SIGNIN_CANCELLED:
//             dispatch(loginError(""));

//             //console.log("User cancelled Apple signin.");
//             break;
//           default:
//             if ([401, 400].includes(error.status)) dispatch(loginError(error.message));
//             else dispatch(loginError("Something went wrong with apple Sign In"));
//             break;
//         }
//       }
//     }
//   }
// }

// export const EmailOtpverfiy = (params, callback) => async (dispatch) => {
//   dispatch(userDetailsRequest());
//   try {
//     const user = await UserController.emailotpverify(params);
//     dispatch(userDetailsSuccess(user.data));
//     callback(user)
//     HttpClient.setAuthorization(user.data.token)
//     //console.log(user);
//   } catch (error) {
//     // //console.log(error)
//     dispatch(userLogout(error.status))
//     dispatch(userDetailsError(error.message));
//   }

// };


// export const updateUserEmail = (userdata, func) => async (dispatch) => {
//   // dispatch(userDetailsRequest());
//   try {
//     const user = await UserController.updateUserEmail(userdata);
//     func(true)
//   } catch (error) {
//     func(false)
//     dispatch(userLogout(error.status))
//     if (!axios.isCancel(error))
//       dispatch(userDetailsError(error.message));
//   }
// }

export const updateUserpassword = (body, callback) => async (dispatch) => {
  dispatch(forgotRequest());
  try {
    const { endpoint, header } = EndPoints.changepassword
    const status = await PATCH(endpoint, body, header);
    const { res, error } = status
    console.log(status);
    if (res) {
      callback(true)
      dispatch(forgotSuccess());
    } else {
      callback(false)
      dispatch(forgotError(error.message));
    }
  } catch (error) {
    callback(false)
    dispatch(forgotError(error.message));
  }
}

export const forgot = (body, func) => async (dispatch) => {
  dispatch(forgotRequest());
  try {
    const { endpoint } = EndPoints.forgot
    const user = await POST(endpoint, body);
    // dispatch(forgotSuccess());
    // func()
  } catch (error) {
    dispatch(forgotError(error.message));

  };
}

// export const userDetails = (userId) => async (dispatch) => {
//   dispatch(userDetailsRequest());
//   try {
//     const user = await UserController.userDetails(userId);
//     dispatch(loginSuccess(user));
//     dispatch(prepareapp(user))
//     console.log('user Details');
//   } catch (error) {
//     dispatch(userLogout(error.status))
//     if (!axios.isCancel(error)) {
//       dispatch(userDetailsError(error.message));

//     }
//   } finally {
//     dispatch(resetGlobal())
//   }
// };


export const uploadProfilePicture = (data, callback) => async (dispatch) => {
  dispatch(uploadFileRequest());
  try {
    console.log(data);
    const { endpoint, header } = EndPoints.uploadProfilePic
    const status = await Uploadfiles(endpoint, data, header);
    const { res } = status
    callback({ res })
    if (res) {
      dispatch(uploadFileSuccess(res.data.data));
    } else {
      dispatch(uploadFileError("Oops!! something went wrong..."));
    }
  } catch (error) {
    // dispatch(userLogout(error.status))
    dispatch(uploadFileError(error.message));
  }
}
export const UpdatePhoneNumber = (data, callback) => async (dispatch) => {
  dispatch(PhoneNumberRequest());
  try {
    console.log(data);
    const { endpoint, header } = EndPoints.updatephoneNumber
    const status = await GET(endpoint, header, data);
    const { res, error } = status
    if (res) {
      callback({ res })
      console.log(res);
      dispatch(PhoneNumberSuccess(res.data.phone));
    } else {
      dispatch(PhoneNumberError(error.message));
    }
  } catch (error) {
    // dispatch(userLogout(error.status))
    dispatch(PhoneNumberError(error.message));
  }
}
export const userLogout = (errorcode) => async (dispatch) => {
  //console.log(errorcode);

  if (errorcode == 401) {
    Alert.alert(
      "Session Out !",
      "Please Login to Continue",
      [
        {
          text: "OK",
          style: "cancel"
        }
      ])
    await dispatch(globalReset())
    logoutSuccess()
    dispatch(clearStore());
    return;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await dispatch(globalReset())
    logoutSuccess()
  } finally {
    dispatch(clearStore());
  }
};
