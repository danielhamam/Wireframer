import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler} from '../../redux/reducers/authReducer/authReducerHelpers'
import { registerStarted, registerSucceeded, registerErrored } from '../../redux/actions/actionCreators';
import { getFirestore } from 'redux-firestore';
import constants from '../../config/constants';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    failedMsg: ''
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

//  registerHandler = async (newUser) => {
//     console.log("userActions.registerHandler: Beginning registerHandler with user: ", newUser);
//     const { firebase } = this.props;
//     const firestore = getFirestore();
//     await firebase.auth().createUserWithEmailAndPassword(
//         newUser.email,
//         newUser.password,
//     ).catch((error) => {
//       console.log('Error code: ', error.message);
//       this.setState({ failedMsg : error.message });
//     })
//     .then((objResp) => {
//       firestore.collection('accounts').doc(objResp.user.uid).set({
//         name: newUser.firstName + " " + newUser.lastName,
//         created_time: new Date(),
//         account_key: Math.floor(Math.random() * 1000) + 100,
//         administrator: false,
//         wireframes: []
//       });
//       this.props.registerSucceeded(objResp); // dispatch that registration complete (and auto sign in)
//       this.setState({failedMsg : ''});
//     })
//   };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firstName !== '' && this.state.lastName !== '' && 
    this.state.email !== '' && this.state.password !== '') {

      if (this.state.password.length < 6) {
        this.setState({failedMsg : constants.passwordValidationErrMsg});
        return;
      }

      const credentials = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        email : this.state.email,
        password: this.state.password
      }
      registerHandler(credentials, this.props.firebase, getFirestore, this.props.registerStarted, this.props.registerSucceeded, this.props.registerErrored); // create the user with firebase
    }
    else {
      this.setState({failedMsg : constants.registrationFailedErrMsg});
    }
  }

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (

      <div className="register_box">
        <div className="register-content">
            <form id="register_form" className="form-format" onSubmit={this.handleSubmit}>
              <h5 id="register_text">Register</h5>
              <br/>
              <div className="register-input-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={this.handleChange} />
              </div>
              <div className="register-input-field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={this.handleChange} />
              </div>
              <div className="register-input-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
              </div>
              <div className="register-input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
              </div>
              <div className="register-input-field">
                <br/>
                <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
                <div className="red-text center"><p>{authError ? authError : this.state.failedMsg}</p></div>
              </div>
            </form>
            <div className="register-wireframer-text-box">
              <div id="wireframe_text_box_text"> 
              Wireframer™
              </div>
            </div>
        </div>
      </div>

    );
  }
}

// mapStateToProps = Redux to Component (reading from the store)
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

// mapDispatchToProps = Component to Redux (calling an action, writing to the store)
// Will map a function, "register", to a dispatcher
const mapDispatchToProps = dispatch => ({
  // registerUser: (user, firebase) => dispatch(registerHandler(user, firebase, getFirestore))
  registerStarted: () => dispatch(registerStarted()),
  registerSucceeded: () => dispatch(registerSucceeded()),
  registerErrored: () => dispatch(registerErrored())
});

export default compose(
  firebaseConnect(), // (Higher Order Component) props.firebase set on RegisterScreen component as firebase object with helpers
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);