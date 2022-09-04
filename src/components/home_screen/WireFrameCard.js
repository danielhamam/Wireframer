import React from 'react';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class WireFrameCard extends React.Component {


deleteWireframe = (wire_key) => {

    const fireStore = getFirestore();
    const { account } = this.props;
    const wireframes = account.wireframes;

    let index = wireframes.map(function (wireframe) {return wireframe.key;}).indexOf(wire_key);

    account.wireframes.splice(index, 1);
    fireStore.collection("accounts").doc(account.id).update({ wireframes: account.wireframes});

}
    render() {

        const { account } = this.props;
        if (account.id !== this.props.id) {
            return null;
        }
        else {
            const wireframes = account.wireframes;
        return (
            <div>
                <div className="card-content black-text text-darken-3">
                    <span className="card-title"> 

                        {wireframes && wireframes.map(wireframe => (
                            <div className="wireframe_card">
                                <div id="delete_icon" class="material-icons small" onClick={ () => {this.deleteWireframe(wireframe.key)}} > delete</div>
                                <Link to={'/wireframe/' + wireframes.map(function (wireframe) {return wireframe.key;}).indexOf(wireframe.key)} >
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
}

export default WireFrameCard;