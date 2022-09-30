import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { showRegisterLink, showLoginLink } from '../../redux/actions/actionCreators';

class LoggedOutLinks extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedOutLink : window.location.pathname, // when rerenders, extracts from url
    }
  }

  toggleLink = () => {
    if (this.state.loggedOutLink === '/login') this.setState({loggedOutLink : '/register'});
    else this.setState({loggedOutLink : '/login'});
  }

  render() {
    return (
      <ul className = "right" >
        <li >
          {this.state.loggedOutLink === '/login' ? 
          <NavLink to="/register" onClick={() => this.toggleLink()}>
            <span id="navbar_links">Register</span>
          </NavLink>
          :
          <NavLink to="/login" onClick={() => this.toggleLink()}>
            <span id="navbar_links">Login</span>
          </NavLink>
        }
        </li>
      </ul>
    );
  }
}

export default LoggedOutLinks;