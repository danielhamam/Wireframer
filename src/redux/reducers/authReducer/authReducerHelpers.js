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

export const registerHandler = (newUser, firebase, getFirestore) => (dispatch) => {
  console.log("userActions.registerHandler: Beginning registerHandler with user: ", newUser);
    dispatch(actionCreators.registerStarted());
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then((objResp) => {
      firestore.collection('accounts').doc(objResp.user.uid).set({
        name: newUser.firstName + " " + newUser.lastName,
        created_time: new Date(),
        account_key: Math.floor(Math.random() * 1000) + 100,
        administrator: false,
        wireframes: []
      });
      return objResp;
    }).then((objResp) => {
      console.log("userActions.registerHandler: Created new account and user object for ", objResp);
      dispatch(actionCreators.registerSucceeded(objResp));
    }).catch((err) => {
      dispatch({ type: 'REGISTER_ERRORED', err });
    });
};