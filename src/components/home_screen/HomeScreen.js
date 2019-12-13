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
    administrator: false,
    goAdmin : false
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

handleNewWireframe = () => {

  const fireStore = getFirestore();
  let reference = fireStore.collection('accounts').doc(this.props.auth.uid);
  let answer = Math.floor(Math.random() * 1000) + 100;

  reference.update({
      'wireframes': fireStore.FieldValue.arrayUnion({
        name: "Unknown",
        created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
        width : 490, // default
        height : 480, // default
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
    
      if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
      }
      if (this.state.administrator) {
        return <Redirect to="/databaseTester" />;
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
                  <div id="is_administrator"> 
                  <button id="admin_button" onClick={this.checkAdministrator}> Go to Admin Page </button>
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

  const { accounts } = state.firestore.data;

    return {
        // accounts, //.ordered something we can map through. 
        auth: state.firebase.auth,
        accounts : state.firestore.ordered.accounts,
    }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'accounts'},
  ]),
)(HomeScreen);

