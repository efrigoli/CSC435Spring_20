import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

function Header() {
  return (
    <header>
      <nav>
        <h3>CSC-435</h3>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/login">
          Log In
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
