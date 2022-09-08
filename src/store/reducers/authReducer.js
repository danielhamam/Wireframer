import * as actionCreators from '../actions/actionCreators'
import { registerHandler } from '../../store/database/asynchHandler'
import { getFirestore } from 'redux-firestore';

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE

const initState = {};

const authReducer = (state = initState, action) => {
  console.log("authReducer: Beginning mapping of type " + action.type + " to corresponding handler");
  switch (action.type) {
    case actionCreators.LOGIN_ERROR:
      console.log("authReducer: Mapped to " + actionCreators.LOGIN_ERROR);
      return {
        ...state,
        authError: 'Login fail',
      };
    case actionCreators.LOGIN_SUCCESS:
      console.log("authReducer: Mapped to " + actionCreators.LOGIN_SUCCESS);
      return {
        ...state,
        authError: null,
      };
    case actionCreators.REGISTER:
      console.log("authReducer: Mapped to " + actionCreators.REGISTER);
      // debugger;
      return registerHandler(action.user, action.firebase)(getFirestore); // function to handle registering account
    case actionCreators.REGISTER_SUCCESS:
      console.log("authReducer: Mapped to " + actionCreators.REGISTER_SUCCESS);
      return {
        ...state,
        authError: null,
      };
    case actionCreators.REGISTER_ERROR:
      console.log("authReducer: Mapped to " + actionCreators.REGISTER_ERROR);
      return {
        ...state,
        authError: "Registration failed. Please check the field(s) again!",
      };
    default:
      console.log("authReducer: Mapped to DEFAULT");
      return {
      ...state,
      authError: null,
      }
  }
};

export default authReducer;