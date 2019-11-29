import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

import WireFrameCard from './WireFrameCard';

class WireFrameLinks extends React.Component {

    render() {
        // const account_id = this.props.auth.uid;
        // const fireStore = getFirestore();
        const wireframes = this.props.account.wireframes;
        return (
            <div className="wireframes section">
                {wireframes && wireframes.map(wireframe => (
                    <WireFrameCard wireframe={wireframe}/>
                ))}
            </div>
        );
    }
}

// Each component is deciding which things it wants from the store, and we're deciding it right here. 
const mapStateToProps = (state, ownProps) => { // Give me the following things from the database: 
    const { id } = state.firebase.auth.uid;
    const { accounts } = state.firestore.data;
    const account = accounts ? accounts[id] : null;
    // account.id = id;
   return { // ordered something we can map through. 
        auth: state.firebase.auth,
        account
    };
};

export default compose(connect(mapStateToProps))(WireFrameLinks); // makes todolist available as a prop.