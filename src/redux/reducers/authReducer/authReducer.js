import * as actionCreators from '../../actions/actionCreators'
import { registerHandler } from './authReducerHelpers'
import { getFirestore } from 'redux-firestore';

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE


// Setting initial state for a reducer is typically done using default parameters as in the simple addition function below
// function add(a = 0, b = 0) { return a + b }
const initState = {
  user: null,
  creating : false,
  authError: null,
};

// Using ...state spread operator in the sense of "if you can't change it, replace it"

// MANPULATES REDUX STATE
const authReducer = (state = initState, action) => {
  console.log("authReducer: Beginning mapping of type " + action.type + " to corresponding handler");
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
        ...state
      }
    case actionCreators.REGISTER_SUCCEEDED:
      return {
        ...state,
        user : action.user,
        authError: ''   
      };
    case actionCreators.REGISTER_ERRORED:
      console.log("Mapped to Register Errored with message: ", action.error)
      return {
        ...state,
        authError: action.error     
      };
    default:
      return {
      ...state,
      authError: null,
      }
  }
};

export default authReducer;