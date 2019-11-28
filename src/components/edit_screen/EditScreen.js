import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class EditScreen extends Component {

    render() {

        return (

        <div class="container">

        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { accounts } = state.firestore.data;
    const account = accounts ? accounts[id] : null;
    accounts.id = id;
  
    return {
    //   todoList,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
  )(EditScreen);