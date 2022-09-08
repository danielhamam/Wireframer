import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getFirestore) => {
    console.log("asynchHandler.registerHandler: Beginning registerHandler with user: " + newUser);
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('accounts').doc(resp.user.uid).set({
        name: newUser.firstName + " " + newUser.lastName,
        created_time: new Date(),
        account_key: Math.floor(Math.random() * 1000) + 100,
        administrator: false,
        wireframes: []
    })).then((resp) => {
        console.log("asynchHandler.registerHandler: RESP is ", resp);
        dispatch(actionCreators.registerSuccess(resp));
    }).catch((err) => {
      dispatch({ type: 'REGISTER_ERROR', err });
    });
};