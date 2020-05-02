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
  name: 'email',
  type: 'email',
  placeholder: 'ex: john.doe@email.com',
  label: {
    for: 'email',
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
      username: '',
      email: '',
      password: '',
      data: [],
      buttonClicked: false
    };

    // Getting the list of users
    this.displayUsers = this.displayUsers.bind(this);
  }

  // Hooking into the component mounting
  componentDidMount() {
    // Getting all information from the db using the axios get method
    this.getUsers();
  }

  // Setting the state when the button is clicked
  displayUsers() {
    if (!this.state.buttonClicked) {
      this.setState({
        buttonClicked: true
      });
    }
  }

  getUsers = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({data: data});
        console.log('User data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      // Dynamically passing value
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('New user data has been sent to the server!!');
        this.resetUserInputs();
        this.getUsers();
      })
      .catch(() => {
        console.log('Something went wrong in sending the data.');
      });
  };

  resetUserInputs = () => {
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <form className="loginForm" onSubmit={this.submit}>
          <h2>Register</h2>
          <div className="inputContainer">
            <label htmlFor={txtUsername.label.for}> {txtUsername.label.text} </label>
            <input
              type={txtUsername.type}
              name={txtUsername.name}
              placeholder={txtUsername.placeholder}
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor={emlEmail.label.for}> {emlEmail.label.text} </label>
            <input
              type={emlEmail.type}
              name={emlEmail.name}
              placeholder={emlEmail.placeholder}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor={pwdPassword.label.for}> {pwdPassword.label.text} </label>
            <input
              type={pwdPassword.type}
              name={pwdPassword.name}
              placeholder={pwdPassword.placeholder}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <Button
            type='submit'
            label='Create Account'
          />
        </form>

        <div className="displayUsersContainer">
          <button className="" onClick={this.displayUsers} >
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
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
