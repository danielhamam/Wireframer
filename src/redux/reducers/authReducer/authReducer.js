import * as actionCreators from '../../actions/actionCreators'

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE


// Setting initial state for a reducer is typically done using default parameters as in the simple addition function below
// function add(a = 0, b = 0) { return a + b }
const initState = {
  creating : false,
  authError: '',
  loggedOutLink : ''
};

// Using ...state spread operator in the sense of "if you can't change it, replace it"

// MANPULATES REDUX STATE
const authReducer = (state = initState, action) => {
  // console.log("authReducer: Beginning mapping of type " + action.type + " to corresponding handler");
  switch (action.type) {
    case actionCreators.RESET_AUTH_ERROR:
      return {
        ...state,
        authError: ''
      };
    case actionCreators.LOGGED_OUT_LINK_CHANGED:
      console.log('changing loggedOutLink to: ', action.loggedOutLink);
      return {
        ...state,
        loggedOutLink: action.loggedOutLink
      };
    case actionCreators.LOGIN_ERRORED:
      return {
        ...state,
        authError: action.error
      };
    case actionCreators.LOGIN_SUCCEEDED:
      return {
        ...state,
        authError: '',
      };
    case actionCreators.REGISTER_STARTED:
      return {
        ...state
      }
    case actionCreators.REGISTER_SUCCEEDED:
      return {
        ...state,
        // user : action.user, // commented out - user object is available via firebase.auth
        authError: ''   
      };
    case actionCreators.REGISTER_ERRORED:
      // console.log("Mapped to Register Errored with message: ", action.error)
      return {
        ...state,
        authError: action.error     
      };
    default:
      return {
      ...state,
      authError: '',
      }
  }
};

export default authReducer;