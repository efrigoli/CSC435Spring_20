import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

function Footer() {
  return (
    <footer>
      <p>&copy;{new Date().getFullYear()} Elise Frigoli</p>
    </footer>
  );
}

export default Footer;
