import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // pre-made reducer that handles syncing firestore data to our STORE state
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer/authReducer';
import accountReducer from './accountReducer/accountReducer';

// Dispatches (built from actionCreators) get routed to here
const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  firestore: firestoreReducer, // reducer will know about our firebase proj online becasue we passed in firebase config in ReactReduxFirebaseApp.js
  firebase: firebaseReducer,
});

export default rootReducer;