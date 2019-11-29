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
  let reference = fireStore.collection('accounts').doc(this.props.auth.uid);
  let answer = Math.floor(Math.random() * 1000) + 100;

  reference.update({
      'wireframes': fireStore.FieldValue.arrayUnion({
        name: "",
        created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
        items: [],
        key : answer
      })
    }).then(ref => {
      this.setState({isNewWireframe : true});
      this.setState({keytoUse : answer});
  }).catch((error) => {
      console.log(error);
  });

//   const new_wireframe = {
//     name: "",
//     created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
//     items: [],
//     key : answer
// };

  // this.props.account.wireframes.push(new_wireframe);

}

    render() {

      if (this.state.isNewWireframe) {
        return <Redirect to={'/wireframe/' + this.props.account.wireframes.map(function (wireframe) {return wireframe.key;}).indexOf(this.state.key)} />;
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
  const { id } = state.firebase.auth.uid;
  const { accounts } = state.firestore.data;
  // const account = state.account;
  // account.id = id;

    return {
        // accounts, //.ordered something we can map through. 
        auth: state.firebase.auth,
        // account
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
)(HomeScreen);