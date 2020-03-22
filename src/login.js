import React from 'react';
import './index.css';

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
function FormField(props) {
  return (
    <div className="inputContainer">
      <label for={props.label.for}> {props.label.text} </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  )
}

// Creating the button component
function Button(props) {
  return (
    <button type={props.type}>{props.label}</button>
  )
}

// Creating the login form component, with the form field and button components used as subcomponents
function LoginForm(props) {
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

// Creating the login component, composed of all other components
class Login extends React.Component {
  render() {
    return (
      <div className="loginPage">
        <div className="container">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
