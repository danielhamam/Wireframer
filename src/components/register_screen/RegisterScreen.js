import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../redux/reducers/authReducer/authReducerHelpers'
import { getFirestore } from 'redux-firestore';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    if (this.state.firstName !== '' && this.state.lastName !== '' && 
    this.state.email !== '' && this.state.password !== '') {
      props.registerUser(newUser, firebase);
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
                {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
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
  registerUser: (user, firebase) => dispatch(registerHandler(user, firebase, getFirestore)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);