import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { loginHandler } from '../../redux/reducers/authReducer/authReducerHelpers'
import { loginErrored, loginSucceeded } from '../../redux/actions/actionCreators';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
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
    // As we use react-redux-firebas-v3 we need to pass firebase object to
    // authActions to be authorized by using firebase.auth method
    const { props, state } = this;
    const { firebase } = props;
    const credentials = { ...state };
    const authData = {
      firebase,
      credentials,
    };
    loginHandler(credentials, firebase, props.loginSucceeded, props.loginErrored);
  }

  render() {

    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login_box">
        <div className="login-content">
          {/* Flexbox Starts */}
          <div className="form_format"> 
            <form onSubmit={this.handleSubmit} id="login-form">
              <h5 id="login_text">Login</h5>
              < br /> 
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input className="active" type="email" name="email" id="email" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input className="active" type="password" name="password" id="password" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button type="submit" className="btn pink lighten-1 z-depth-0">Login</button>
                {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
              </div>
            </form>
          </div>
          <div className="wireframer_text_box">
            <div id="wireframe_text_box_text"> 
              Wireframer™
            </div>
          </div>
          {/* Flexbox Ends */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  // login: authData => loginHandler(authData)(dispatch),
  loginSucceeded : () => dispatch(loginSucceeded()),
  loginErrored : (error) => dispatch(loginErrored(error)),
});

// We need firebaseConnect function to provide to this component
// firebase object with auth method.
// You can find more information on the link below
// http://docs.react-redux-firebase.com/history/v3.0.0/docs/auth.html

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginScreen);