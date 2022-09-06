import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import WireFrameCard from './WireFrameCard';

class WireFrameLinks extends React.Component {

    render() {

        const { accounts } = this.props;

            return (
              <div className="wireframes section">
                {accounts && accounts.map(account => (
                    <WireFrameCard account={account} id={this.props.auth.uid}/>
                ))}
            </div>
            )
    }
}

// Each component is deciding which things it wants from the store, and we're deciding it right here. 
const mapStateToProps = (state) => { // Give me the following things from the database: 
    let accounts = state.firestore.ordered.accounts;
    // const index = accounts.map(function (account) {return account.id;}).indexOf(id);
    // const account = accounts[index]
   return { // ordered something we can map through. 
        auth: state.firebase.auth,
        accounts
    };
};

export default compose(connect(mapStateToProps))(WireFrameLinks); // makes available as a prop.