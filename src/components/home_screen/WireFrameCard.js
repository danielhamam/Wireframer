import React from 'react';
import { getFirestore } from 'redux-firestore';

class WireFrameCard extends React.Component {

    render() {

        const { wireframe } = this.props;
        return (
            <div className="wireframe_card">
                <div className="card-content black-text text-darken-3">
                    <span className="card-title"> {wireframe.name} </span>
                </div>
            </div>
        );
    }
}
export default WireFrameCard;