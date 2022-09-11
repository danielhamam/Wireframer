import * as actionCreators from '../../actions/actionCreators.js'

export const loginHandler = async ( credentials, firebase, loginSucceeded, loginErrored ) => {
  console.log("userActions.loginHandler: Beginning loginHandler with user: ", credentials);
  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password,
  ).catch((error) => {
    console.log("authReducerHelpers.loginHandler error: ", error.message);
    loginErrored(error.message);
  });
    console.log("LOGIN_SUCCESS");
    loginSucceeded(); // dispatch call
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSucceeded);
    });
};

export const registerHandler = async (newUser, firebase, firestore, startedDispatchCall, 
                                      succeededDispatchCall, erroredDispatchCall) => {
  console.log("authReducerHelpers.registerHandler: Beginning registerHandler with user: ", newUser);
  startedDispatchCall();
  const credentials = {
    'email' : newUser.email,
    'password' : newUser.password
  }
  const userResp = await firebase.auth().createUserWithEmailAndPassword(
      credentials.email,
      credentials.password,
  ).catch((error) => {
    console.log('authReducerHelpers.registerHandler error code when adding user: ', error.message);
    erroredDispatchCall(error.message);
    return;
  })
  if (userResp != null) {
    debugger;
    firestore.collection('accounts').doc(userResp.user.uid).set({
      name: newUser.firstName + " " + newUser.lastName,
      created_time: new Date(),
      account_key: Math.floor(Math.random() * 1000) + 100,
      administrator: false,
      wireframes: []
    }).catch((error) => {
      console.log('authReducerHelpers.registerHandler: Error when adding new user-associated account: ', error);
    });
    succeededDispatchCall(userResp);
    // FIREBASE DOCS: If the new account was created, the user is signed in automatically!
  }
};