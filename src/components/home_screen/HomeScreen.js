import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    render() {

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            
                <div className="row">

                    <div className="wireframer_text_box">
                        <div id="wireframe_text_box_text"> 
                            Wireframer™
                        </div>
                        <button id="create_wireframe_button" onClick={this.handleNewList}>
                        Create New Wireframe
                        </button>
                    </div>

                    <h1 id="recent_work_text"> 
                        Recent Work
                    </h1>
                    
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