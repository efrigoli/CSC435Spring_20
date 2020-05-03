/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/17/20
 * Last Modified: 04/19/20 - Connecting to redux
 */

// Importing dependencies and actions
import React from 'react';
import '../index.css';
import heroImg from '../img/productsHero.jpg';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions';

// Taking the state in the reducer and passing it as props
const mapStateToProps = (state)=>{
  return {
      items: state.items
    }
  }

// Dispatching the ADD_TO_CART action to the reducer
const mapDispatchToProps= (dispatch)=>{
  return{
      addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

// Creating the Products component to render the products page
class Products extends React.Component {

  // Adding the item, used as an onClick function for the item card button
  addItem = (id) => {
      this.props.addToCart(id);
  }

  render(){
    const heroText = 'Products in Stock';
    // Generating an item card for each item in the items array, pulled from the Redux store
    let itemList = this.props.items.map(item=>{
      return(
        <div className="productsItemCard" key={item.id}>
          <ItemListing key={item.id} imageSource={item.img} alt={item.alt} title={item.title} price={item.price} />
          <Button onClick={()=>{this.addItem(item.id)}} buttonLabel='Add To Cart' buttonType='cartButton' />
        </div>
      )
    })
    return(
      <div className="content productsPageWrapper">
        <div className="fullWidthContainer heroContainer">
          <img src={heroImg} className="heroImg" alt="Products Hero" />
          <h1 className="heroTitle">{heroText}</h1>
        </div>
        <div className="container productsPage">
          <div className="productsItemListings">
              {itemList}
          </div>
        </div>
      </div>
    )
  }
}

/* ItemListing component, which creates a card containing the image, title, and price of an item */
class ItemListing extends React.Component {
  render() {
    return (
      <div className="productsDetails">
        <div className="productsItemCardImgContainer">
          <img src={this.props.imageSource} alt={this.props.alt} />
        </div>
        <h3>{this.props.title}</h3>
        <h4>${this.props.price}</h4>
      </div>
    )
  }
}

/* Button component, which receives an onClick function, label, and button type as props */
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type="button" className={this.props.buttonType}>
        {this.props.buttonLabel}
      </button>
    )
  }
}

// Connecting the Product component to the data in the store
export default connect(mapStateToProps, mapDispatchToProps)(Products)
