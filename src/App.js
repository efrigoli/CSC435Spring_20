/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/18/20
 * Last Modified: 04/19/20 - Re-structured app
 */

  // Importing dependencies
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
 import './index.css';
 import Home from './components/home';
 import Login from './components/login';
 import Cart from './components/cart';
 import Products from './components/products';
 import Notfound from './components/notFound';
 import Header from "./components/header";
 import Footer from "./components/footer";
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

// Creating App component to contain router swtich
 class App extends React.Component {
   render() {
     return (
       <Router>
         <div>
           <Header />
           <Switch>
             <Route exact path="/" component={Home} />
             <Route path="/products" component={Products} />
             <Route path="/cart" component={Cart} />
             <Route path="/login" component={Login} />
             <Route component={Notfound} />
           </Switch>
           <Footer contactData={contactData}/>
         </div>
       </Router>
     );
   }
 }

 export default App;
