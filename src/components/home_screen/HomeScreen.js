import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import WireFrameLinks from './WireFrameLinks';

class HomeScreen extends Component {

  state = {
    isNewWireframe : false,
    wireframe_id : 0,
  }

handleNewWireframe = () => {

  const fireStore = getFirestore();
  let reference = fireStore.collection('accounts').doc(this.props.account.id);
  let answer = Math.floor(Math.random() * 1000) + 100;
  this.setState({keytoUse : answer});

  reference.update({
      'wireframes': fireStore.FieldValue.arrayUnion({
        name: "",
        created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
        items: []
      })
    }).then(ref => {
      this.setState({wireframe_id: ref.id});
      this.setState({isNewItem : true});
  }).catch((error) => {
      console.log(error);
  });
}

    render() {

      if (this.state.isNewWireframe) {
        return <Redirect to={'/wireframe/' + this.state.wireframe_id} />;
     }
      if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
      }
        return (
            
            <div className="home_box">
            <div className="row">
                <div id="form_format"> 
              <form onSubmit={this.handleSubmit} className="col s4 white">
                <h5 id="login_text">Recent Work</h5>
                < WireFrameLinks />
              </form>
              </div>
    
              <div className="wireframer_text_box">
                  <div id="wireframe_text_box_text"> 
                     Wireframer™
                  </div>
            </div>
    
            </div>
                                    
                <button id="create_wireframe_button" onClick={this.handleNewWireframe}>
                    Create New Wireframe
                </button>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { accounts } = state.firestore.data;
  const account = accounts ? accounts[id] : null;
  account.id = id;

    return {
        account,
        accounts: state.firestore.ordered.accounts, //.ordered something we can map through. 
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
)(HomeScreen);