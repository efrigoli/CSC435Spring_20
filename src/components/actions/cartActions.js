/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/17/20
 * Last Modified:
 *
 */

 // Importing action types
 import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY } from './action-types/cart-actions'

 // Creating the add to cart action, which accepts an id parameter of the item being added
 export const addToCart = (id) => {
   return {
       type: ADD_TO_CART,
        id
    }
 }

 // Creating the remove item action, which accepts an id parameter of the item being removed
 export const removeItem = (id) => {
   return {
       type: REMOVE_ITEM,
        id
    }
 }

 // Creating the add quantity action, which accepts an id parameter of the item whose quantity is being increased
 export const addQuantity = (id) => {
   return {
       type: ADD_QUANTITY,
        id
    }
 }

 // Creating the subtract quantity action, which accepts an id parameter of the item whose quantity is being decreased
 export const subtractQuantity = (id) => {
   return {
       type: SUB_QUANTITY,
        id
    }
 }
