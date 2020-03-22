// Elise Frigoli
// CSC 435 - Advanced Web App Development
// Created: 03/21/20
// Last Modified: 03/22/20 - Added Comments

// Importing dependencies
import React from "react";

// Creating the Footer component to render the footer
function Footer() {
  return (
    <footer>
      <p>&copy;{new Date().getFullYear()} Elise Frigoli</p>
    </footer>
  );
}

export default Footer;
