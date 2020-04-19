/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                03/28/20 - Changed FormField, Button, and LoginForm components from function to class types
 *                04/17/20 - Added hero image panel for stylistic consistency throughout site
 */

// Importing dependencies
import React from 'react';
import '../index.css';
import heroImg from '../img/loginHero.jpg';

// Setting up immutable elements for each of the form fields
const emlEmail = {
  name: 'emailAddress',
  type: 'email',
  placeholder: 'ex: john.doe@email.com',
  label: {
    for: 'emailAddress',
    text: 'Enter Your Email Address'
  },
};

const pwdPassword = {
  name: 'password',
  type: 'password',
  placeholder: 'Password',
  label: {
    for: 'password',
    text: 'Enter Your Password'
  },
};

// Creating the form field component
class FormField extends React.Component {
  render() {
    return (
      <div className="inputContainer">
        <label htmlFor={this.props.label.for}> {this.props.label.text} </label>
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

// Creating the button component
class Button extends React.Component {
  render() {
    return (
      <button type={this.props.type}>{this.props.label}</button>
    )
  }
}

// Creating the login form component, with the form field and button components used as subcomponents
class LoginForm extends React.Component{
  render() {
    return (
      <div className="loginForm">
        <h2>Log In</h2>
        <FormField
          name={emlEmail.name}
          type={emlEmail.type}
          placeholder={emlEmail.placeholder}
          label={emlEmail.label}
        />
        <FormField
          name={pwdPassword.name}
          type={pwdPassword.type}
          placeholder={pwdPassword.placeholder}
          label={pwdPassword.label}
        />
        <Button
          type='submit'
          label='Log In'
        />
      </div>
    )
  }
}

// Creating the Login component, composed of all other components
class Login extends React.Component {
  render() {
    const heroText = 'Admin Portal Login';
    return (
      <div className="loginPageWrapper">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Login Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
        <div className="loginPage">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
