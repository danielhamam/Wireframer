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
    index_use : 0,
  }

handleNewWireframe = () => {

  const fireStore = getFirestore();
  let reference = fireStore.collection('accounts').doc(this.props.auth.uid);
  let answer = Math.floor(Math.random() * 1000) + 100;

  reference.update({
      'wireframes': fireStore.FieldValue.arrayUnion({
        name: "Unknown",
        created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
        items: [],
        key : answer
      })
    }).then(ref => {
      this.setState({isNewWireframe : true});
      this.setState({keytoUse : answer});
      // this.setState({index_use : }); 
  }).catch((error) => {
      console.log(error);
  });

}
    render() {

    //   if (this.state.isNewWireframe) {
    //     return <Redirect to={'/wireframe/' + this.state.index_use} />;
    //  }
      if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
      }
        return (
            
            <div className="home_box">
            <div className="row">
                <div id="form_format"> 
              <form onSubmit={this.handleSubmit} className="col s4 white">
                <h5 id="login_text">Recent Work</h5>
                < WireFrameLinks accounts={this.props.accounts}/>
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
  // const { id } = state.firebase.auth.uid;
  const { accounts } = state.firestore.data;
  // const account = state.account;
  // account.id = id;

    return {
        // accounts, //.ordered something we can map through. 
        auth: state.firebase.auth,
        accounts : state.firestore.ordered.accounts
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
)(HomeScreen);