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
    // const { todoLists } = state.firestore.data;
    // const todoList = todoLists ? todoLists[id] : null;
    // todoList.id = id;
  
    return {
    //   todoList,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(EditScreen);