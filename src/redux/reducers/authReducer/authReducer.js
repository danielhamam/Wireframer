import * as actionCreators from '../../actions/actionCreators'
import { registerHandler } from './authReducerHelpers'
import { getFirestore } from 'redux-firestore';

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE


// Setting initial state for a reducer is typically done using default parameters as in the simple addition function below
// function add(a = 0, b = 0) { return a + b }
const initState = {
  creating : false
};

// Using ...state spread operator in the sense of "if you can't change it, replace it"

// MANPULATES REDUX STATE
const authReducer = (state = initState, action) => {
  // console.log("authReducer: Beginning mapping of type " + action.type + " to corresponding handler");
  switch (action.type) {
    case actionCreators.LOGIN_ERRORED:
      return {
        ...state,
        authError: 'Your username or password is incorrect',
      };
    case actionCreators.LOGIN_SUCCEEDED:
      return {
        ...state,
        authError: null,
      };
    case actionCreators.REGISTER_STARTED:
      return {
        ...state,
        creating: true
      }
    case actionCreators.REGISTER_SUCCEEDED:
      return {
        ...state,
        user : action.user,
        creating: false
      };
    case actionCreators.REGISTER_ERRORED:
      return {
        ...state,
        authError: "Registration failed. Please check the field(s) again!",
      };
    default:
      return {
      ...state,
      authError: null,
      }
  }
};

export default authReducer;