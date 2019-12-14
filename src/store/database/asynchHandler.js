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

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
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
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
      dispatch({ type: 'REGISTER_ERROR', err });
    });
};