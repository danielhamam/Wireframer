import React from 'react'
import { connect } from 'react-redux';
import accountJson from './TestWireframesData.json'
import { getFirestore } from 'redux-firestore';
import {Button, Icon} from 'react-materialize';

class DatabaseTester extends React.Component {

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
        accountJson.accounts.forEach(accountJson => {
            fireStore.collection('accounts').add({
                    created_time: new Date(),
                    name: accountJson.name,
                    account_key: accountJson.account_key,
                    administrator: accountJson.administrator,
                    wireframes: accountJson.wireframes,
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });

        

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

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);