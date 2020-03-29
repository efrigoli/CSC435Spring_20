/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 03/21/20
 * Last Modified: 03/22/20 - Added Comments
 *                         - Created homepage components
 */

// Importing dependencies
import React from 'react';
import './index.css';
import heroImg from './img/homeHero.jpg';
import bookList from './itemLists/bookList.json';
import supplyList from './itemLists/supplyList.json';
import merchList from './itemLists/merchList.json';

// Creating the App component to render the homepage
class App extends React.Component {
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
        <div className="fulLWidthContainer loginPanel">
          <div className="container">
            <h2>Already have items saved in your cart?</h2>
            <a className="buttonLink" href="/login">Login Now!</a>
          </div>
        </div>
      </div>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className="switchButton">
        {this.props.buttonLabel}
      </button>
    )
  }
}

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
  showBooks = () => {
    this.setState(state => ({
      itemType: 'books',
      displayBooks: true,
      displaySupplies: false,
      displayMerch: false,
    }));
  };
  showSupplies = () => {
    this.setState(state => ({
      itemType: 'school supplies',
      displayBooks: false,
      displaySupplies: true,
      displayMerch: false,
    }));
  };
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
        <BookRow displayBooks={this.state.displayBooks} />
        <SupplyRow displaySupplies={this.state.displaySupplies} />
        <MerchRow displayMerch={this.state.displayMerch} />
        <Button onClick={this.showBooks} buttonLabel='Show Books' />
        <Button onClick={this.showSupplies} buttonLabel='Show Supplies' />
        <Button onClick={this.showMerch} buttonLabel='Show Merch' />
      </div>
    )
  }
}


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
          return <ItemListing key={index} imageSource={require('./img/' + book.imageSource)} alt={book.alt} title={book.title} price={book.price} />
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
        return <ItemListing key={index} imageSource={require('./img/' + supply.imageSource)} alt={supply.alt} title={supply.title} price={supply.price} />
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
        return <ItemListing key={index} imageSource={require('./img/' + merch.imageSource)} alt={merch.alt} title={merch.title} price={merch.price} />
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

export default App;
