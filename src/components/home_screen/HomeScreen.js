import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'; // use this as a higher order component to connect cmp with firestore data
import { getFirestore } from 'redux-firestore';
import WireFrameCards from './WireFrameCards';

class HomeScreen extends Component {

  state = {
    isNewWireframe : false,
    wireframeKey : null,
    list_index : 0,
    adminRedirect: false,
    goAdmin : false,
  }

handleNewWireframe = () => {
  const fireStore = getFirestore();
  let answer = Math.floor(Math.random() * 1000) + 100;
  fireStore.collection('accounts').doc(this.props.auth.uid).update({
      'wireframes': fireStore.FieldValue.arrayUnion({
        name: "Unknown",
        created_time: new Date(), // to later sort, the ones in json dont need a date. that order doesnt matter. 
        width : 490, // default
        height : 480, // default
        items: [],
        scale : 1,
        key : answer
      })
    }).then(() => {
      this.setState({wireframeKey : answer});
      this.setState({isNewWireframe : true});
    }).catch((error) => {
      console.log(error);
  });  
}

componentDidMount() {
  // Check if user is an administrator
  // this.checkAdministrator()
}

    render() {
    
      if (!this.props.auth.uid) {
        return <Redirect to="/login" />;
      }
      if (this.state.adminRedirect) {
        return <Redirect to="/databaseTester" />;
      }

      if (this.state.isNewWireframe) {
        return <Redirect to={'/wireframe/' + this.state.wireframeKey} />;
     }

        return (
          
          <div className="home_wrapper">
            {/* Flexbox Starts */}
            <div className="home-content">
              <div className="form_format"> 
                <form onSubmit={this.handleSubmit} className="">
                  <h5 id="login_text">Recent Work</h5>
                  <div onClick={this.updateList} >
                    <div className="wireframes section">
                        <WireFrameCards wireframes={this.props.wireframes}/>
                    </div>
                  </div>
                </form>
              </div>
              <div className="wireframer_text_box">
                <div id="wireframe_text_box_text"> 
                  Wireframer™
                </div>
                {/* Display admin button only if user is an administrator */}
                {this.props.isAdministrator === true ? 
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

const mapStateToProps = (state) => {
    // console.log("HomeScreen.js State: ", state);
    return {
        isAdministrator : state.firebase.profile.administrator,
        auth: state.firebase.auth,
        wireframes : state.firebase.profile.wireframes
    }
};

export default compose( // compose is a redux function
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'accounts' } // When component is active, I want to connect to accounts collection
    ])
)(HomeScreen);
