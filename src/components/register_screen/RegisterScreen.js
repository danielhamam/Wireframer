import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

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

    if (this.state.firstName != '' && this.state.lastName != '' && 
    this.state.email != '' && this.state.password != '') {
      props.register(newUser, firebase);
    }
  }

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (

      <div className="register_box">

<div className="wireframer_text_box">
          <div id="wireframe_text_box_text"> 
            Wireframer™
          </div>
        </div>
        <div className="row">

        <form id="register_form" onSubmit={this.handleSubmit} className="white">
          <h5 className="black-text text-darken-3" id="register_text">Register</h5>
          <div className="input-field2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field2">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field2">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </div>
        </form>

      </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);