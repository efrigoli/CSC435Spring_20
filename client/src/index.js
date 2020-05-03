/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                04/05/20 - Added Cart to routing
 *                04/19/20 - Re-structured application, added Redux
 */

// Importing dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing React-Bootstrap Style Library

// Creating a store to hold the state tree of the entire application
const store = createStore(cartReducer);

ReactDOM.render(
  // Wrapping the application in a provider, which allows us to pass the store as props to components
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
