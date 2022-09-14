import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeBox from './WireframeBox';

class EditScreen extends Component {
  render() {
    return (
      <div className="edit_box">
        {this.props.wireframes && this.props.auth ? 
        (
          <WireframeBox accounts={this.props.accounts} wireframe={this.props.wireframes ? this.props.wireframes[this.props.wireframes.map((wireframer) => wireframer.key).indexOf(Number(this.props.match.params.key))] : null} 
          wireframe_key={Number(this.props.match.params.key)} accountId={this.props.auth.uid} wireframes={this.props.wireframes}/>
        ) 
        : null
        }
      </div>
      );
  }
}

// mapStateToProps = Redux to Component (reading from the store)
const mapStateToProps = (state) => { // arg of state is the entire redux store 
  // console.log("editscreen, state: ", state);
  // debugger;
  return {
    auth: state.firebase.auth,
    accounts : state.firestore.ordered.accounts,
    wireframes: state.firebase.profile.wireframes
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'accounts' },
  ]),
)(EditScreen);