import { TYPES } from "../actions/UserActions";


export const userReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...payload?.user };
    // case TYPES.SIGNUP_SUCCESS:
    //   return { ...payload?.user };
    case TYPES.UPLOAD_SUCCESS:
      return { ...state, ...payload?.user };
    case TYPES.UPDATE_SUCCESS:
      return { ...state, ...payload?.user };
    case TYPES.PHONENUMBER_UPDATE_SUCCESS:
      return { ...state, phone:payload?.phone };
    // case TYPES.FORGOT_SUCCESS:
    //   return {};
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
