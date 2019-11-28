import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestWireframesData.json'
import { getFirestore } from 'redux-firestore';
import {Button, Icon} from 'react-materialize';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    
    handleClear = () => {

    }

    handleReset = () => {

    }

    render() {

        return (
            <div>
                
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>

            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);