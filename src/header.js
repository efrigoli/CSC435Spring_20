// Elise Frigoli
// CSC 435 - Advanced Web App Development
// Created: 03/21/20
// Last Modified: 03/22/20 - Added Comments

// Importing dependencies
import React from "react";
import { NavLink } from "react-router-dom";

// Creating the Header component to render the header
function Header() {
  return (
    <header>
    /*{ Setting up navigation bar, with nav links to route to each page }*/
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
