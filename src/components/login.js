/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                03/28/20 - Changed FormField, Button, and LoginForm components from function to class types
 *                04/17/20 - Added hero image panel for stylistic consistency throughout site
 *                04/26/20 - Writing submitted values to the console until login global state is set up
 */

// Importing dependencies
import React from 'react';
import '../index.css';
import heroImg from '../img/loginHero.jpg';
import axios from "axios";


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


// Creating the button component
class Button extends React.Component {
  render() {
    return (
      <button type={this.props.type}>{this.props.label}</button>
    )
  }
}


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emlValue: '',
      pwdValue: ''
    };

    this.handleEmlChange = this.handleEmlChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmlChange(event) {
    this.setState({emlValue: event.target.value});
  }

  handlePwdChange(event) {
    this.setState({pwdValue: event.target.value});
  }

  handleSubmit(event) {
    console.log('The following information has been submitted:\nEmail: ' + this.state.emlValue + '\nPassword: ' + this.state.pwdValue);
    event.preventDefault();
  }

  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
      <h2>Log In</h2>
      <div className="inputContainer">
        <label htmlFor={emlEmail.label.for}> {emlEmail.label.text} </label>
        <input
          type={emlEmail.type}
          name={emlEmail.name}
          placeholder={emlEmail.placeholder}
          value={this.state.emlValue}
          onChange={this.handleEmlChange}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor={pwdPassword.label.for}> {pwdPassword.label.text} </label>
        <input
          type={pwdPassword.type}
          name={pwdPassword.name}
          placeholder={pwdPassword.placeholder}
          value={this.state.pwdValue}
          onChange={this.handlePwdChange}
        />
      </div>
      <Button
        type='submit'
        label='Log In'
      />
      </form>
    );
  }
}

// Creating the Login component, composed of all other components
class Login extends React.Component {
  render() {
    const heroText = 'Log in to Your Account';
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
