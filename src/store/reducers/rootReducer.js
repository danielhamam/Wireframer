import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // syncing firestore
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import accountReducer from './accountReducer';

// Dispatches (built from actionCreators) get routed to here
const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;