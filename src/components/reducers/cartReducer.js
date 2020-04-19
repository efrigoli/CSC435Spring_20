/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/17/20
 * Last Modified:
 *
 */

// Importing images and action types
import Book1 from '../../img/bookFrankenstein.jpg'
import Book2 from '../../img/bookMobyDick.jpg'
import Book3 from '../../img/bookPhoto.jpg'
import Supply1 from '../../img/paperclips.jpg'
import Supply2 from '../../img/notebook.jpg'
import Supply3 from '../../img/pencils.jpg'
import Merch1 from '../../img/letterman.jpg'
import Merch2 from '../../img/mug.jpg'
import Merch3 from '../../img/pennant.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY } from '../actions/action-types/cart-actions'

// Creating the initial state
const initState = {
    // Items state, an array of all items in the inventory
    items: [
      {
        id: 1,
        img: Book1,
        alt: "Frankenstein",
        title: "Frankenstein by Mary Shelley",
        price: 25
      },
      {
        id: 2,
        img: Book2,
        alt: "Moby Dick",
        title: "Moby Dick by Herman Melville",
        price: 35
      },
      {
        id: 3,
        img: Book3,
        alt: "Better Photo Basics",
        title: "Better Photo Basics by Jim Miotke",
        price: 20
      },
      {
        id: 4,
        img: Supply1,
        alt: "Paperclips",
        title: "Paperclips (150 ct.)",
        price: 4
      },
      {
        id: 5,
        img: Supply2,
        alt: "Spiral-Bound Notebook",
        title: "Spiral-Bound Notebook (250 pages)",
        price: 5
      },
      {
        id: 6,
        img: Supply3,
        alt: "No.2 Pencils",
        title: "No.2 Pencils (12-pack)",
        price: 2
      },
      {
        id: 7,
        img: Merch1,
        alt: "Letterman Jacket",
        title: "Embroidered Letterman Jacket",
        price: 75
      },
      {
        id: 8,
        img: Merch2,
        alt: "Ceramic Mug",
        title: "Ceramic Mug",
        price: 9
      },
      {
        id: 9,
        img: Merch3,
        alt: "Pennant Banner",
        title: "Pennant Banner",
        price: 18
      }
    ],
    // AddedItems, an array containing items that have been added to the cart
    addedItems:[],
    // Total, a running total of the item prices in the cart
    total: 0,
    // numCartItems, a running total of number of items in the cart, including quantity changes
    numCartItems: 0

}
// cartReducer function which accepts the current state as the state, and the action as parameters
const cartReducer = (state = initState,action) => {
  switch (action.type) { // Creating a switch based on the type of action being received
    case ADD_TO_CART: // If the action is adding an item to the cart
      // Finding the item that dispatched the action
      let addedItem = state.items.find(item => item.id === action.id)
      // Seeing if the item triggering the id is already added to the cart
      let existingItem= state.addedItems.find(item=> action.id === item.id)
        // If it is already in the cart, increase the quantity by 1
         if(existingItem)
         {
           addedItem.quantity += 1;
           // Add 1 to the number of total items
           let newAddedNum = state.numCartItems + 1
           return {
              ...state,
              total: state.total + addedItem.price,
              numCartItems: newAddedNum
          }

        }
       else { // If it is not already in the cart
          // Set the quantity to 1
          addedItem.quantity = 1;
          // Calculate the total of the cart with the new price added
          let newAddedTotal = state.total + addedItem.price
          // Add 1 to the number of total items
          let newAddedNum = state.numCartItems + 1
          return {
              ...state,
              // Appending new item to addedItem list
              addedItems: [...state.addedItems, addedItem],
              // Setting the total to the new total
              total : newAddedTotal,
              numCartItems: newAddedNum
          }
       }
    case REMOVE_ITEM: // If the action is removing an item from the cart
      // Finding the item that dispatched the action
      let itemToRemove= state.addedItems.find(item=> action.id === item.id)
      // Filtering the added items list to remove this item
      let newItemList = state.addedItems.filter(item=> action.id !== item.id)
      // Calculate the total of the cart with the item removed
      let newRemovedTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      // Sub 1 from the number of total items
      let newRemovedNum = state.numCartItems - itemToRemove.quantity
      return{
          ...state,
          addedItems: newItemList,
          total: newRemovedTotal,
          numCartItems: newRemovedNum
      }
    case ADD_QUANTITY: // If the action is to add quantity to a cart item
      // Finding the item that dispatched the action
      let increasedItem = state.items.find(item=> item.id === action.id)
      // Increasing the quantity of the item
      increasedItem.quantity += 1
      // Recalculating the total with the new quantity of the item
      let newIncreasedTotal = state.total + increasedItem.price
      // Add 1 to the number of total items
      let newIncreasedNum = state.numCartItems + 1
      return {
          ...state,
          total: newIncreasedTotal,
          numCartItems: newIncreasedNum
      }
    case SUB_QUANTITY: // If the action is to reduce quantity of a cart item
      // Finding the item that dispatched the action
      let decreasedItem = state.items.find(item=> item.id === action.id)
      // If there is only 1 of the item in the cart, remove it from the list
      if(decreasedItem.quantity === 1){
          // Filter the added items list to remove the item entirely
          let newItemList = state.addedItems.filter(item=>item.id !== action.id)
          // Recalculate the total based on the new quantity
          let newDecreasedTotal = state.total - decreasedItem.price
          // Sub 1 from the number of total items
          let newDecreasedNum = state.numCartItems - 1
          return{
              ...state,
              addedItems: newItemList,
              total: newDecreasedTotal,
              numCartItems: newDecreasedNum
          }
      }
      else { // If the original quantity is greater than 1
          // Reduce the quantity by 1
          decreasedItem.quantity -= 1
          // Recalculate the total
          let newDecreasedTotal = state.total - decreasedItem.price
          // Sub 1 from the number of total items
          let newDecreasedNum = state.numCartItems - 1
          return{
              ...state,
              total: newDecreasedTotal,
              numCartItems: newDecreasedNum
          }
      }
    default:
      return state
  }
}

export default cartReducer;
