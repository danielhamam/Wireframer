import React from 'react'
import { connect } from 'react-redux';
import accountJson from './TestWireframesData.json'
import { getFirestore } from 'redux-firestore';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { registerHandler } from '../store/database/asynchHandler';
import { Redirect } from 'react-router-dom';

class DatabaseTester extends React.Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        goHome : false,
        administator : false
      }
    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    
    goHome = () => {
        this.setState({goHome : true});
      }

    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('accounts').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let reference = fireStore.collection('accounts').doc(doc.id).get();
                reference.then(
                    doc => {
                      let info = doc.data();
                      if (info.administrator != true) {
                        fireStore.collection('accounts').doc(doc.id).delete();
                      }
            })
        });
    })
}

    handleReset = () => {
        const fireStore = getFirestore();
        const { props, state } = this;
        const { firebase } = props;

        accountJson.accounts.forEach(accountJson => {
        fireStore.collection('accounts').doc(accountJson.account_id).set({
            created_time: new Date(),
            name: accountJson.name,
            email: accountJson.email,
            account_key: accountJson.account_key,
            administrator: accountJson.administrator,
            wireframes: accountJson.wireframes,
            })
        });
    }

    checkAdministrator = () => {

        const fireStore = getFirestore();
        let reference = fireStore.collection('accounts').doc(this.props.auth.uid).get();
        let boolean1 = "";
      
        reference.then(
        doc => {
          let info = doc.data();
          if (info.administrator === true) {
            let boolean1 = true;
            this.setState({ administrator : boolean1});
            // this.setState({administrator : true});
          }
          else {
            let boolean1 = false;
            this.setState({ administrator : boolean1});
          }
          }
        )
      }

    render() {

        if (this.state.goHome) {
            return <Redirect to="/" />;
          }

        if (!this.props.auth.uid) {
            return <Redirect to="/" />;
        }

        {this.checkAdministrator()}
        if (this.state.administrator == false) {
            return <Redirect to="/" />;
        }

        return (
            
            <div>
                <br />
                <br /> 
                <br /> 
                <button id="return_home" className="handle_button" onClick={this.goHome}> Return Home </button>
                <br /> 
                <button className="handle_button" onClick={this.handleClear}>Clear Database</button>
                <button className="handle_button" onClick={this.handleReset}>Reset Database</button>
                <br /> 
                <br /> 
                <br />
                <br />
                <div> 
                    NOTE: This page is for administators only. Please be cautious when clearing
                    the database, it will clear the data of NON-ADMINS as dictated in the firestore. As for 
                    the Reset button, default users will be loaded into the database for testing
                    purposes. For any questions, please contact daniel.hamam@stonybrook.edu. Enjoy the
                    use of your controls as an administrative designer!
                </div>
                <br /> 
                <br />
                <br />

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