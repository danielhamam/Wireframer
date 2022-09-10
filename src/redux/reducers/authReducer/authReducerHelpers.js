import * as actionCreators from '../../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
  console.log("userActions.loginHandler: Beginning loginHandler with user: ", credentials);
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCEEDED' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERRORED', err });
    });
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
  const userResp = await firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password,
  ).catch((error) => {
    console.log('authReducerHelpers.registerHandler error code when adding user: ', error.message);
    erroredDispatchCall(error.message);
    return;
  })
  if (userResp != null) {
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
  }
};