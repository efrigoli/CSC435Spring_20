/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                04/05/20 - Added Cart to routing
 */

// Importing dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './login';
import Cart from './cart';
import Notfound from './notFound';
import Header from "./header";
import Footer from "./footer";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing React-Bootstrap Style Library

// Creating contact data to be passed to the footer component
var contactData = {
  phone: "1-800-0000",
  emailAddresses:["info@bookstore.com", "order-support@bookstore.com"],
  street: "800 Franklin Street",
  city: "Cityville",
  state: "AZ",
  zip: "11111"
}

// Creating the routing to link between pages
const routing = (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route component={Notfound} />
      </Switch>
      <Footer contactData={contactData}/>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
