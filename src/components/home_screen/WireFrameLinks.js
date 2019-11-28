import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';

import WireFrameCard from './WireFrameCard';

class WireFrameLinks extends React.Component {

    render() {
        const accounts = this.props.accounts;
        return (
            <div className="todo-lists section">
                {accounts && accounts.map(account => (
                    <Link to={'/wireframe/' + account.id} key={account.id} >
                        <WireFrameCard account={account}/>
                    </Link>
                ))}
            </div>
        );
    }
}

// Each component is deciding which things it wants from the store, and we're deciding it right here. 
const mapStateToProps = (state) => { // Give me the following things from the database: 
    const {accounts} = state.firestore.data;
    return {
        accounts: state.firestore.ordered.accounts, // ordered something we can map through. 
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireFrameLinks); // makes todolist available as a prop.