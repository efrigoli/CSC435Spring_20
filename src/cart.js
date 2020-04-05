/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/04/20
 * Last Modified: 04/05/20 -
 */

// Importing dependencies
import React from 'react';
import './index.css';
// import sampleCartList from './itemLists/sampleCartList.json';


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
          <h3>{this.props.title}</h3>
          <h4>${this.props.price}</h4>
        </div>
      </div>
    )
  }
}

/* CartItemQuanity component, which contains the quantity of the item
in the cart, passed as a prop */
class CartItemQuantity extends React.Component {
  render() {
    return (
      <div className="cartItemQuantity">
        <h4>Quantity: {this.props.quantity}</h4>

        <div className="cartItemQuantity">
          <h4>Total Price: ${this.props.quantity * this.props.price}</h4>
        </div>
      </div>
    )
  }
}


// Creating the Add/Subtract Item button component
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className="changeQuantityButton">
        {this.props.buttonLabel}
      </button>
    )
  }
}

// Creating the CartItem component, which creates a CartItem row containing Item information
class CartItem extends React.Component{

componentDidMount() {
  this.props.initialCount(this.props.quantity);
}
componentWillUnmount(){
  console.log('Component Has Been Unmounted');
}

  render() {
    let removeItem;
    if (this.props.quantity > 1) {
      removeItem = <Button onClick={() => this.props.onSubtract(this.props.id)} buttonLabel='-' />
    }
    else {
      removeItem = <Button onClick={() => this.props.onDelete(this.props.id)} buttonLabel='-' />
    }
    return (
      <div className="cartItemContainer" id={this.props.id}>
        <CartItemInfo imageSource={this.props.imageSource} alt={this.props.alt} title={this.props.title} price={this.props.price} />
        <CartItemQuantity quantity={this.props.quantity} price={this.props.price} />
        <Button onClick={() => this.props.onAdd(this.props.id)} buttonLabel='+' />
        {removeItem}
        <Button onClick={() => this.props.onDelete(this.props.id, this.props.quantity)} buttonLabel='Remove' />
      </div>
    )
  }
}

// Creating the CartList component, which contains a CartItem row for each item in the cart JSON file
class CartList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0,
      cartStatus: "",
      cartUpdated: false,
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

  onDeleteItem = (i, quantity) => {
    this.setState(state => {
      const cartItems = this.state.cartItems.filter((item, j) => i !== j);
      return {
        cartItems,
      };
    });
    this.setState({itemCount: this.state.itemCount - quantity, cartUpdated: true})
  };

  onAddItem = i => {
    this.setState(state => {
      const itemList = state.cartItems.map((item, j) => {
        if (j === i) {
          item.quantity = item.quantity + 1;
          console.log("new quantity: " + item.quantity);
          return item;
        } else {
          return item;
        }
      });
      return {
        itemList,
      };
    });
    this.setState({itemCount: this.state.itemCount + 1, cartUpdated: true});
  };

    onSubtractItem = i => {
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
      if (this.state.itemCount > 1) {
        this.setState({itemCount: this.state.itemCount - 1, cartUpdated: true});
      }
      else {
        this.setState({itemCount: 0, cartUpdated: true});
      }
    };

initialCount = (quantity) => {
  this.setState(prevstate => ({ itemCount: prevstate.itemCount + quantity}));
}


    componentDidUpdate(prevProps, prevState) {
        if (this.state.cartUpdated !== prevState.cartUpdated) {
          this.setState({cartStatus: "Cart Updated!"})
        }
    }

  render() {
    return (
      <div className="cartContainer">
      <h2>{this.state.cartStatus}<br/>You have {this.state.itemCount} items in your cart.</h2>
        {this.state.cartItems.map((item, index) => {
         return (
             <CartItem
             onDelete={this.onDeleteItem}
             onAdd={this.onAddItem}
             onSubtract={this.onSubtractItem}
             initialCount={this.initialCount}
             id={index}
             key={index}
             imageSource={require('./img/' + item.imageSource)}
             alt={item.alt}
             title={item.title}
             price={item.price}
             quantity={item.quantity} />
         )
        })}
      </div>
    )
  }
}

// Creating the Login component, composed of all other components
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

export default Cart;
