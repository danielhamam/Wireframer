import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    render() {

        if (this.state.isNewItem) {
           return <Redirect to={'/todoList/' + this.state.list_index} />;
        }

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            
            <div className="dashboard container">
                <div className="row">
                    <div id="your_lists">Your Lists</div> 
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists, //.ordered something we can map through. 
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['created_time', 'desc']},
    ]),
)(HomeScreen);