/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/25/20
 * Last Modified: 04/26/20 - Added a way to display current users in the db for debugging
 */

// Importing dependencies
import React from 'react';
import '../index.css';
import heroImg from '../img/loginHero.jpg';
import axios from "axios";


// Setting up immutable elements for each of the form fields
const txtUsername = {
  name: 'username',
  type: 'text',
  placeholder: 'Username',
  label: {
    for: 'username',
    text: 'Enter A Username'
  },
};

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
    text: 'Enter A Password'
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

// Creating the registration form component
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    // Storing the value of each field as the state of the form component
    this.state = {
      userNameValue: '',
      emlValue: '',
      pwdValue: ''
    };
    // Handling the form changes and the form submission
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmlChange = this.handleEmlChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Setting the username state based on the field value
  handleUserNameChange(event) {
    this.setState({userNameValue: event.target.value});
  }
  // Setting the email state based on the field value
  handleEmlChange(event) {
    this.setState({emlValue: event.target.value});
  }
  // Setting the password state based on the field value
  handlePwdChange(event) {
    this.setState({pwdValue: event.target.value});
  }
  // Handling the form submission
  handleSubmit(event) {
    // Displaying the submitted information in the console for debugging
    console.log('The following information has been submitted:\nUsername: ' + this.state.userNameValue + '\nEmail: ' + this.state.emlValue + '\nPassword: ' + this.state.pwdValue);
    // Preventing standard form submission
    event.preventDefault();
    // Creating a user object based on the values submitted in the form
    const userObject = {
        username: this.state.userNameValue,
        email: this.state.emlValue,
        password: this.state.pwdValue
    };
    // Sending the user object to the server via axios post
    axios.post("http://localhost:4000/create", userObject)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });
    // Resetting the form state to blank values
    this.setState({ userNameValue: '', emlValue: '', pwdValue: '' })
  }

  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <div className="inputContainer">
          <label htmlFor={txtUsername.label.for}> {txtUsername.label.text} </label>
          <input
            type={txtUsername.type}
            name={txtUsername.name}
            placeholder={txtUsername.placeholder}
            value={this.state.userNameValue}
            onChange={this.handleUserNameChange}
          />
        </div>
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
          label='Create Account'
        />
      </form>
    );
  }
}

// Creating the user display to view all users in the db for debugging
class UserDisplay extends React.Component{
  constructor() {
    super();
    // Storing the data from the db in the state
    this.state = {
      data: [],
      buttonClicked: false
    };
    // Getting the list of users
    this.getUsers = this.getUsers.bind(this);
  }
  // Hooking into the component mounting
  componentDidMount() {
    // Getting all information from the db using the axios get method
    axios.get("http://localhost:4000/getData").then(res => {
      this.setState({
        data: res.data
      });
      console.log(res.data)
    });
  }
  // Setting the state when the button is clicked
  getUsers() {
    if (!this.state.buttonClicked) {
      this.setState({
        buttonClicked: true
      });
    }
  }

  render() {
    return (
      <div className="displayUsersContainer">
        <button className="" onClick={this.getUsers} >
          View Existing User Information
        </button>
        <div className="displayUsers">
          {this.state.buttonClicked
            ? this.state.data.map(data => {
                return (
                  <div className="displayedUser">
                    <h6>
                      <br/>
                      <b>name</b> : {data.username}
                    </h6>
                    <h6>
                      <b>password</b> : {data.password}
                    </h6>
                    <h6>
                      <b>email</b> : {data.email}
                    </h6>
                    <hr />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

// Creating the Register page component, composed of all other components
class Register extends React.Component {
  render() {
    const heroText = 'Register for an Account';
    return (
      <div className="loginPageWrapper">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Registration Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
        <div className="loginPage">
          <div className="container">
            <RegisterForm />
            <UserDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
