import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeBox from './WireframeBox';


class EditScreen extends Component {

    render() {

        return (

        <div className="edit_box">
          <WireframeBox accounts={this.props.accounts} wireframe_key={this.props.match.params.key} id={this.props.auth.uid}/>
        </div>
        );
    }
    }

    const mapStateToProps = (state) => {
      // console.log(state);
      return {
        auth: state.firebase.auth,
        accounts : state.firestore.ordered.accounts,
       }
    };
    
    export default compose(
      connect(mapStateToProps),
      firestoreConnect([
        { collection: 'accounts' },
      ]),
    )(EditScreen);