import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class LoggedOutLinks extends React.Component {
  constructor() {
    super();
    this.state = {
      // loggedOutLink : '/login', // when rerenders, extracts from url
    }
  }

  render() {

    // console.log("LOGGED OUT LINK: ", this.props.loggedOutLink);

    return (
      <ul className = "right" >
        <li >
          {this.props.loggedOutLink === '/register' ? 
          <NavLink to="/register">
            <span id="navbar_links">Register</span>
          </NavLink>
          :
          <NavLink to="/login">
            <span id="navbar_links">Login</span>
          </NavLink>
        }
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("STATE: ", state);
  return {
    authError: state.auth.authError,
    loggedOutLink: state.auth.loggedOutLink,
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(LoggedOutLinks);