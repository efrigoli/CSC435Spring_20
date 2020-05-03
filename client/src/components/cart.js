/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/04/20
 * Last Modified: 04/05/20 - Finished funcionality of cart item counting, added comments
 *                04/17/20 - Added hero image panel for stylistic consistency throughout site
 *                04/19/20 - Refactored code to work through Redux
 */

// Importing dependencies and actions
import React from 'react';
import '../index.css';
import heroImg from '../img/cartHero.jpg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions';

// Taking the state in the reducer and passing it as props
const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        total: state.total,
        numCartItems: state.numCartItems
    }
}

// Dispatching the REMOVE_ITEM, ADD_QUANTITY, and SUBTRACT_QUANTITY actions to the reducer
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}

// Creating the Cart component, composed of a CartList
class Cart extends React.Component {
  //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

  render(){
    const heroText = 'Shopping Cart';
    // Finding the added items
    let addedItems = this.props.items.length ?
      (this.props.items.map(item=>{
        // For each item in the addedItems array
        return(
          <div className="cartItemContainer" id={item.id}>
            <CartItemInfo imageSource={item.img} alt={item.alt} title={item.title} quantity={item.quantity} price={item.price} />
            <div className="buttonContainer">
              <Button onClick={()=>{this.handleAddQuantity(item.id)}} buttonLabel='+' />
              <Button onClick={()=>{this.handleSubtractQuantity(item.id)}} buttonLabel='-' />
              {removeItem}
              <Button onClick={()=>{this.handleRemove(item.id)}} buttonLabel='Remove' />
            </div>
          </div>
        )
      })
    ):
    (<p>Your cart is currently empty. <Link to="/products">Shop now!</Link></p> )

   return(
       <div className="cartPage">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Cart Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
          <div className="container">
            <div className="cartContainer">
              <div className="cart">
                  <h3>You have {this.props.numCartItems} items in your cart.</h3>
                  {addedItems}
              </div>
              <div className="cartTotal">
                <h2>Cart Total: ${this.props.total}</h2>
              </div>
            </div>
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

// Connecting the Cart component to the data in the store
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
