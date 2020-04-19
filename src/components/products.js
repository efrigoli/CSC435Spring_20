/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/17/20
 * Last Modified:
 *
 */

// Importing dependencies
import React from 'react';
import '../index.css';
import heroImg from '../img/productsHero.jpg';
import bookList from '../itemLists/bookList.json';
import supplyList from '../itemLists/supplyList.json';
import merchList from '../itemLists/merchList.json';

// Creating the Products component to render the products page
class Products extends React.Component {
  render() {
    const heroText = 'Products in Stock';
    return (
      <div className="content productsPageWrapper">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Products Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
        <div className="container productsPage">
          <ItemContainer />
        </div>
      </div>
    )
  }
}

// ItemContainer component which has four states
class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: 'all products',
      displayBooks: true,
      displaySupplies: true,
      displayMerch: true,
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
  // showMerch function, which sets the state of the ItemContainer to display all items
  showAll = () => {
    this.setState(state => ({
      itemType: 'all products',
      displayBooks: true,
      displaySupplies: true,
      displayMerch: true,
    }));
  };
  render() {
    return (
      <div className="productsItemContainer">
        <div className="itemSwitchContainer">
          <h2>Filter Products by Category:</h2>
        {/* Button components, which change the state of the parent component, which in turn allows
           them to communcate to their sibling gallery components */}
          <Button onClick={this.showBooks} buttonLabel='Books' buttonType='filterButton' />
          <Button onClick={this.showSupplies} buttonLabel='Supplies' buttonType='filterButton' />
          <Button onClick={this.showMerch} buttonLabel='Merch' buttonType='filterButton' />
          <Button onClick={this.showAll} buttonLabel='All Products' buttonType='filterButton' />
        </div>
        <div className="productsDisplayContainer">
          <h3>{this.state.itemType}</h3>
          {/* Individual gallery components, which inherit their states from the parent component */}
          <BookListings displayBooks={this.state.displayBooks} />
          <SupplyListings displaySupplies={this.state.displaySupplies} />
          <MerchListings displayMerch={this.state.displayMerch} />
        </div>
      </div>
    )
  }
}

// BookListings component, which creates a gallery of book item listings by reading from the bookList.JSON file using keys
class BookListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBooks: this.props.displayBooks,
    };
  }
  render() {
    let bookClassNames;
    if (this.props.displayBooks) {
      bookClassNames = 'productsItemListings';
    } else {
      bookClassNames = 'productsItemListings hidden';
    }
    return (
      <div>
        <div className={bookClassNames}>
          {bookList.map((book, index) => {
            return <ItemListing key={index} imageSource={require('../img/' + book.imageSource)} alt={book.alt} title={book.title} price={book.price} />
          })}
        </div>
      </div>
    )
  }
}

// SupplyListings component, which creates a gallery of item listings by reading from the supplyList.JSON file using keys
class SupplyListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySupplies: this.props.displaySupplies,
    };
  }
  render() {
    let supplyClassNames;
    if (this.props.displaySupplies) {
      supplyClassNames = 'productsItemListings';
    } else {
      supplyClassNames = 'productsItemListings hidden';
    }
    return (
      <div>
        <div className={supplyClassNames}>
          {supplyList.map((supply, index) => {
            return <ItemListing key={index} imageSource={require('../img/' + supply.imageSource)} alt={supply.alt} title={supply.title} price={supply.price} />
          })}
        </div>
      </div>
    )
  }
}

// MerchListings component, which creates a gallery of book item listings by reading from the merchList.JSON file using keys
class MerchListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMerch: this.props.displayMerch,
    };
  }
  render() {
    let merchClassNames;
    if (this.props.displayMerch) {
      merchClassNames = 'productsItemListings';
    } else {
      merchClassNames = 'productsItemListings hidden';
    }
    return (
      <div>
        <div className={merchClassNames}>
          {merchList.map((merch, index) => {
            return <ItemListing key={index} imageSource={require('../img/' + merch.imageSource)} alt={merch.alt} title={merch.title} price={merch.price} />
          })}
        </div>
      </div>
    )
  }
}

/* ItemListing component, which creates a card containing the image, title, and price of an item,
read from one of the three JSON files */
class ItemListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
      buttonLabel: 'add to cart',
      buttonType: 'cartButton'
    };
  }

  // toggleCart function, which either adds or removes the item from the cart based on its current state
  toggleCart = () => {
    if (this.state.inCart) {
      this.setState(state => ({
        inCart: false,
        buttonLabel: 'add to cart',
        buttonType: 'cartButton'
      }));
    } else {
      this.setState(state => ({
        inCart: true,
        buttonLabel: 'remove from cart',
        buttonType: 'cartButton inCart'
      }));
    }
  };

  render() {
    return (
      <div className="productsItemCard">
        <div className="productsItemCardImgContainer">
          <img src={this.props.imageSource} alt={this.props.alt} />
        </div>
        <h3>{this.props.title}</h3>
        <h4>${this.props.price}</h4>
        <Button onClick={this.toggleCart} buttonLabel={this.state.buttonLabel} buttonType={this.state.buttonType} />
      </div>
    )
  }
}

// Button component, which receives an onClick function, label, and button type as props
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={this.props.buttonType}>
        {this.props.buttonLabel}
      </button>
    )
  }
}

export default Products;
