/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/04/20
 * Last Modified: 04/05/20 - Finished funcionality of cart item counting, added comments
 */

// Importing dependencies
import React from 'react';
import './index.css';


// Creating the Cart component, composed of a CartList
class Cart extends React.Component {
  render() {
    return (
      <div className="cartPage">
        <div className="container">
          <h2>Shopping Cart</h2>
          <CartList />
        </div>
      </div>
    );
  }
}

/* Creating the CartList component, which contains a CartItem row for each item in the data
* Currently using state array of sample data, will eventually pull from database */
class CartList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0,
      cartStatus: "",
      cartUpdated: false,
      cartTotal: 0,
      cartItems: [
        {
          "imageSource": "bookFrankenstein.jpg",
          "alt": "Frankenstein",
          "title": "Frankenstein by Mary Shelley",
          "price": "24.99",
          "quantity": 1
        },
        {
          "imageSource": "mug.jpg",
          "alt": "Ceramic Mug",
          "title": "Ceramic Mug",
          "price": "8.99",
          "quantity": 2
        },
        {
          "imageSource": "bookMobyDick.jpg",
          "alt": "Moby Dick",
          "title": "Moby Dick by Herman Melville",
          "price": "34.99",
          "quantity": 1
        },
        {
          "imageSource": "pencils.jpg",
          "alt": "No.2 Pencils",
          "title": "No.2 Pencils (12-pack)",
          "price": "1.99",
          "quantity": 3
        }
      ],
    };
  }

  // Used by child components to delete an item entirely from the cart and update the cart total
  onDeleteItem = (i, quantity, total) => {
    this.setState(state => {
      const cartItems = this.state.cartItems.filter((item, j) => i !== j);
      return {
        cartItems,
      };
    });
    this.setState({
      itemCount: this.state.itemCount - quantity,
      cartTotal: this.state.cartTotal - total,
      cartUpdated: true})
  };

  // Used by child components to add an additional quantity of 1 to an item in the cart and update the cart total
  onAddItem = (i, price) => {
    this.setState(state => {
      const itemList = state.cartItems.map((item, j) => {
        if (j === i) {
          item.quantity = item.quantity + 1;
          return item;
        } else {
          return item;
        }
      });
      return {
        itemList,
      };
    });
    this.setState({
      itemCount: this.state.itemCount + 1,
      cartTotal: this.state.cartTotal + parseFloat(price),
      cartUpdated: true});
  };

  // Used by child components to subtract a quantity of 1 from an item in the cart and update the cart total
  onSubtractItem = (i, price) => {
    this.setState(state => {
      const itemList = this.state.cartItems.map((item, j) => {
        if (j === i) {
          item.quantity = item.quantity - 1;
          return item;
        } else {
          return item;
        }
      });
      return {
        itemList,
      };
    });
    this.setState({
      itemCount: this.state.itemCount - 1,
      cartTotal: this.state.cartTotal - parseFloat(price),
      cartUpdated: true});
  };

  // Used by child components to set the initial count of items in the cart to the number of items in the array
  initialCount = (quantity) => {
    this.setState(prevstate => ({ itemCount: prevstate.itemCount + quantity}));
  }

  // Used by child components to set the initial total price of all items in the cart
  initialTotal = (totalPrice) => {
    this.setState(prevstate => ({ cartTotal: prevstate.cartTotal + totalPrice}));
  }

  // When the CartList updates, change the status message to inform the user it updated successfully
  componentDidUpdate(prevProps, prevState) {
      if (this.state.cartUpdated !== prevState.cartUpdated) {
        this.setState({cartStatus: "Cart Updated Successfully!"})
      }
  }

  // Renders a CartItem component for each item in the data array and displays the total of all items in cart at the bottom
  render() {
    return (
      <div className="cartContainer">
      <h4>{this.state.cartStatus}</h4>
      <h3>You have {this.state.itemCount} items in your cart.</h3>
        {this.state.cartItems.map((item, index) => {
         return (
             <CartItem
             key={index}
             initialCount={this.initialCount}
             initialTotal={this.initialTotal}
             onDelete={this.onDeleteItem}
             onAdd={this.onAddItem}
             onSubtract={this.onSubtractItem}
             id={index}
             imageSource={require('./img/' + item.imageSource)}
             alt={item.alt}
             title={item.title}
             price={item.price}
             quantity={item.quantity} />
         )
        })}
        <div className="cartTotal">
          <h2>Cart Total: ${this.state.cartTotal.toFixed(2)}</h2>
        </div>
      </div>
    )
  }
}

// Creating the CartItem component, which creates a CartItem row containing all item information
class CartItem extends React.Component{

  // Updating the initial count of the CartList when each CartItem component mounts
  componentDidMount() {
    this.props.initialCount(this.props.quantity);
    this.props.initialTotal(this.props.price * this.props.quantity);
  }

  /* Using the console log to confirm the unmounting of each CartItem component that is deleted
  *  Will do database connection cleanup inside this hook once database is connected */
  componentWillUnmount(){
    console.log('Component Has Been Unmounted');
  }

  // Rendering the item information and buttons to update the item quantities and remove items from cart
  render() {
    let removeItem;
    if (this.props.quantity > 1) {
      removeItem = <Button onClick={() => this.props.onSubtract(this.props.id, this.props.price)} buttonLabel='-' />
    }
    else {
      removeItem = <Button onClick={() => this.props.onDelete(this.props.id, this.props.quantity, this.props.quantity*this.props.price)} buttonLabel='-' />
    }
    return (
      <div className="cartItemContainer" id={this.props.id}>
        <CartItemInfo imageSource={this.props.imageSource} alt={this.props.alt} title={this.props.title} quantity={this.props.quantity} price={this.props.price} />
        <div className="buttonContainer">
          <Button onClick={() => this.props.onAdd(this.props.id, this.props.price)} buttonLabel='+' />
          {removeItem}
          <Button onClick={() => this.props.onDelete(this.props.id, this.props.quantity, this.props.quantity*this.props.price)} buttonLabel='Remove' />
        </div>
      </div>
    )
  }
}

/* CartItemInfo component, which contains the image, title, and price of an item,
read from the JSON list of items in the cart */
class CartItemInfo extends React.Component {
  render() {
    return (
      <div className="cartItemInfo">
        <div className="cartItemImgContainer">
          <img src={this.props.imageSource} alt={this.props.alt} />
        </div>
        <div className="cartItemDetailsContainer">
          <h4>{this.props.title}</h4>
          <h5>${this.props.price}</h5>
          <h6 className="quantity">Quantity: {this.props.quantity}</h6>
          <h6 className="totalPrice">Total Price: ${this.props.quantity*this.props.price}</h6>
        </div>
      </div>
    )
  }
}

// Creating the Add/Subtract/Remove item button component
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className="changeQuantityButton">
        {this.props.buttonLabel}
      </button>
    )
  }
}

export default Cart;
