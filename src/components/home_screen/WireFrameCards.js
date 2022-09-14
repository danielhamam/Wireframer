import React from 'react';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class WireFrameCards extends React.Component {


deleteWireframe = (wireframeKey) => {

    const fireStore = getFirestore();
    let index = this.props.wireframes.map(function (wireframe) {return wireframe.key;}).indexOf(wireframeKey);
    this.props.wireframes.splice(index, 1);
    fireStore.collection("accounts").doc(this.props.userId).update({ wireframes: this.props.wireframes});
}
    render() {

        // if (account.id !== this.props.id) {
        //     return null;
        // }
        // else {
        //     const wireframes = account.wireframes;
        return (
            <div>
                <div className="card-content black-text text-darken-3">
                    <span className="card-title"> 
                        {this.props.wireframes && this.props.wireframes.map(wireframe => (
                            <div className="wireframe_card" key={wireframe.key}>
                                <div id="delete_icon" className="material-icons small" onClick={ () => {this.deleteWireframe(wireframe.key)}} > delete</div>
                                <Link to={'/wireframe/' + wireframe.key} on >
                                    <div id = "wireframe_name">
                                        {wireframe.name}
                                    </div>
                                </Link>
                            </div>
                        ))}
                     </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.firestore.data.accounts,
        userId : state.firebase.auth.uid // same as account id 
    }
};

export default compose( // compose is a redux function
  connect(mapStateToProps),
//   firestoreConnect([
//       { collection: 'accounts' } // When component is active, I want to connect to accounts collection
//     ])
)(WireFrameCards);