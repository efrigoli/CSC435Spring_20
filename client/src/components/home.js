/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                         - Created homepage components
 *                04/17/20 - Updated Login panel to Checkout panel
 *                04/19/20 - Changed page to Home.js to restructure application
 */

// Importing dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import heroImg from '../img/homeHero.jpg';
import bookList from '../itemLists/bookList.json';
import supplyList from '../itemLists/supplyList.json';
import merchList from '../itemLists/merchList.json';

// Creating the Home component to render the homepage
class Home extends React.Component {
  render() {
    const heroText = 'Welcome to the Campus Bookstore';
    return (
      <div className="content">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Homepage Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
        <div className="container homePage">
          <ItemContainer />
        </div>
        <div className="fulLWidthContainer checkoutPanel">
          <div className="container">
            <h2>Already have items saved in your cart?</h2>
            <Link to="/cart"><a className="buttonLink">Checkout Now!</a></Link>
          </div>
        </div>
      </div>
    )
  }
}

// Button component, which receives an onClick function and label as props
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className="switchButton">
        {this.props.buttonLabel}
      </button>
    )
  }
}

// ItemContainer component which has four states
class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: 'books',
      displayBooks: true,
      displaySupplies: false,
      displayMerch: false,
    };
  }
// showBooks function, which sets the state of the ItemContainer to only display book items
  showBooks = () => {
    this.setState(state => ({
      itemType: 'books',
      displayBooks: true,
      displaySupplies: false,
      displayMerch: false,
    }));
  };
  // showSupplies function, which sets the state of the ItemContainer to only display supply items
  showSupplies = () => {
    this.setState(state => ({
      itemType: 'school supplies',
      displayBooks: false,
      displaySupplies: true,
      displayMerch: false,
    }));
  };
  // showMerch function, which sets the state of the ItemContainer to only display merchandise items
  showMerch = () => {
    this.setState(state => ({
      itemType: 'school merchandise',
      displayBooks: false,
      displaySupplies: false,
      displayMerch: true,
    }));
  };
  render() {
    return (
      <div className="homeItemContainer">
        <h2>Recently Added {this.state.itemType}</h2>
        {/* Individual row components, which inherit their states from the parent component */}
        <BookRow displayBooks={this.state.displayBooks} />
        <SupplyRow displaySupplies={this.state.displaySupplies} />
        <MerchRow displayMerch={this.state.displayMerch} />
        {/* Button components, which change the state of the parent component, which in turn allows
           them to communcate to their sibling row components */}
        <Button onClick={this.showBooks} buttonLabel='Show Books' />
        <Button onClick={this.showSupplies} buttonLabel='Show Supplies' />
        <Button onClick={this.showMerch} buttonLabel='Show Merch' />
      </div>
    )
  }
}

// BookRow component, which creates a row of book item listings by reading from the bookList.JSON file using keys
class BookRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBooks: this.props.displayBooks,
    };
  }
  render() {
    let bookRow;
    if (this.props.displayBooks) {
      bookRow =
      <div className="homeItemRow">
        {bookList.map((book, index) => {
          return <ItemListing key={index} imageSource={require('../img/' + book.imageSource)} alt={book.alt} title={book.title} price={book.price} />
        })}
      </div>;
    } else {
      bookRow = null;
    }
    return (
      <div>
        {bookRow}
      </div>
    )
  }
}

// SupplyRow component, which creates a row of book item listings by reading from the supplyList.JSON file using keys
class SupplyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySupplies: this.props.displaySupplies,
    };
  }
  render() {
    let supplyRow;
    if (this.props.displaySupplies) {
      supplyRow = <div className="homeItemRow">
      {supplyList.map((supply, index) => {
        return <ItemListing key={index} imageSource={require('../img/' + supply.imageSource)} alt={supply.alt} title={supply.title} price={supply.price} />
      })}
      </div>;
    } else {
      supplyRow = null;
    }
    return (
      <div>
        {supplyRow}
      </div>
    )
  }
}

// MerchRow component, which creates a row of book item listings by reading from the merchList.JSON file using keys
class MerchRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMerch: this.props.displayMerch,
    };
  }
  render() {
    let merchRow;
    if (this.props.displayMerch) {
      merchRow = <div className="homeItemRow">
      {merchList.map((merch, index) => {
        return <ItemListing key={index} imageSource={require('../img/' + merch.imageSource)} alt={merch.alt} title={merch.title} price={merch.price} />
      })}
      </div>;
    } else {
      merchRow = null;
    }
    return (
      <div>
        {merchRow}
      </div>
    )
  }
}

/* ItemListing component, which creates a card containing the image, title, and price of an item,
read from one of the three JSON files */
class ItemListing extends React.Component {
  render() {
    return (
      <div className="homeItemCard">
        <div className="homeItemCardImgContainer">
          <img src={this.props.imageSource} alt={this.props.alt} />
        </div>
        <h3>{this.props.title}</h3>
        <h4>${this.props.price}</h4>
      </div>
    )
  }
}

export default Home;
