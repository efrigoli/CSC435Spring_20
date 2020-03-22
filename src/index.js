import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './login';
import Header from "./header";
import Footer from "./footer";
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Footer />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

serviceWorker.unregister();
