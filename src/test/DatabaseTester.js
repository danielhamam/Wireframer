import React from 'react'
import { connect } from 'react-redux';
import accountJson from './TestWireframesData.json'
import { getFirestore } from 'redux-firestore';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { registerHandler } from '../store/database/asynchHandler'

class DatabaseTester extends React.Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('accounts').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                fireStore.collection('accounts').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        const { props, state } = this;
        const { firebase } = props;
        const newUser = { ...state };

        accountJson.accounts.forEach(accountJson => {
        firebase.auth().createUserWithEmailAndPassword(
            accountJson.email,
            accountJson.password,
        ).then(resp => fireStore.collection('accounts').doc(resp.user.uid).set({
            created_time: new Date(),
            name: accountJson.name,
            email: accountJson.email,
            account_key: accountJson.account_key,
            administrator: accountJson.administrator,
            wireframes: accountJson.wireframes,
        }))
    });

        // accountJson.accounts.forEach(accountJson => {
        //     fireStore.collection('accounts').add({
        //             created_time: new Date(),
        //             name: accountJson.name,
        //             email: accountJson.email,
        //             account_key: accountJson.account_key,
        //             administrator: accountJson.administrator,
        //             wireframes: accountJson.wireframes,
        //         }).then( () => {
        //             this.setState({ email : accountJson.email});
        //             this.setState({ firstName : accountJson.firstName});
        //             this.setState({ lastName : accountJson.lastName});
        //             this.setState({ password : accountJson.password});
        //             // no password
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // });

        // props.register(newUser, firebase);
        // this.props.firebase.auth().createUserWithEmailAndPassword(
        //     newUser.email,
        //     newUser.password
        // );
    }

    render() {

        return (
            <div>
                <br />
                <br /> 
                <br /> 
                <br /> 
                <button className="handle_button" onClick={this.handleClear}>Clear Database</button>
                <button className="handle_button" onClick={this.handleReset}>Reset Database</button>
                <br /> 
                <br /> 
                <br />
                <br />
                <div> 
                    NOTE: This page is for administators only. Please be cautious when clearing
                    the database, as it will clear the data as dictated in the firestore. As for 
                    the Reset button, default users will be loaded into the database for testing
                    purposes. For any questions please contact daniel.hamam@stonybrook.edu. Enjoy
                     use of your controls as an administrative designer. Thank you!
                </div>

            </div>)
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError,
  });

const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });
  

  export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps),
  )(DatabaseTester);