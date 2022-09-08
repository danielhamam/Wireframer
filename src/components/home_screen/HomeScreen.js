import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'; // use this as a higher order component to connect cmp with firestore data
import { getFirestore } from 'redux-firestore';

import WireFrameLinks from './WireFrameLinks';

class HomeScreen extends Component {

  state = {
    isNewWireframe : false,
    wireframe_id : 0,
    list_index : 0,
    administrator: false,
    adminRedirect: false,
    goAdmin : false,
  }

checkAdministrator = () => {
  // debugger;
  if (this.props.auth.uid) {
    const fireStore = getFirestore();
    let reference = fireStore.collection('accounts').doc(this.props.auth.uid).get();
    reference.then(
    doc => {
      let info = doc.data();
      if (info && info.administrator === true) {
        this.setState({ administrator : true});
      }
      else {
        this.setState({ administrator : false});
      }
      }
    )
  }
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
    }).then(resp => {
      this.setState({isNewWireframe : true});
  }).catch((error) => {
      console.log(error);
  });  
  let account_index = this.props.accounts && this.props.accounts.map(function (account) {return account.id;}).indexOf(this.props.auth.uid);
  this.setState({ list_index : this.props.accounts[account_index].wireframes.length});
}

componentDidMount() {
  // Check if user is an administrator
  this.checkAdministrator()
}

    render() {
    
      if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
      }
      if (this.state.adminRedirect) {
        return <Redirect to="/databaseTester" />;
      }

      if (this.state.isNewWireframe) {
        return <Redirect to={'/wireframe/' + this.state.list_index} />;
     }

        return (
          
          <div className="home_wrapper">
            {/* Flexbox Starts */}
            <div className="home-content">
              <div className="form_format"> 
                <form onSubmit={this.handleSubmit} className="">
                  <h5 id="login_text">Recent Work</h5>
                  <div onClick={this.updateList} >
                    < WireFrameLinks accounts={this.props.accounts}/>
                  </div>
                </form>
              </div>
              <div className="wireframer_text_box">
                <div id="wireframe_text_box_text"> 
                  Wireframer™
                </div>
                {/* Display admin button only if user is an administrator */}
                {this.state.administrator === true ? 
                <div id="is_administrator"> 
                  <button id="admin_button" onClick={() => this.setState({adminRedirect: true})}> Go to Admin Page 🔐</button>
                </div> : ''}
              </div>
            </div>
            {/* Flexbox Ends */}
            <div id="create_wireframe">
              <button id="create_wireframe_button" onClick={this.handleNewWireframe}>
              Create New Wireframe
              </button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("HomeScreen.js State: ", state);
    return {
        // accounts, //.ordered something we can map through. 
        auth: state.firebase.auth,
        accounts : state.firestore.ordered.accounts // retrieve correct data via firestore connect
    }
};

export default compose( // compose is a redux function
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'accounts' } // When component is active, I want to connect to accounts collection
    ])
)(HomeScreen);
