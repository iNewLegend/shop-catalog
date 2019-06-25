/**
 * @file: js/api/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import API from './api.js';

const debug = true;

export default class API_Cart {

    /**
     * Function constructor() Create Cart Api 
     * 
     * @param {API} api
     */
   constructor(api) {
       if (debug) console.log(`${this.constructor.name}::constructor()`);

       this.api = api;
   }

   /**
    * Function get() : Get cart
    * 
    * @param {function()} callback 
    */
   get(callback) {
       if (debug) console.log(`${this.constructor.name}::get()`);

       this.api.get('cart/index').then(data => callback(data));
   }

   /**
    * Function addItem() : Add item to cart
    * 
    * @param {function()} callback 
    * @param {number} id 
    * @param {number} amount 
    */
   addItem(callback, id, amount = 1) {
       if (debug) console.log(`${this.constructor.name}::addCartItem('${id}', '${amount}')`);

       const params = { id, amount };

       this.api.post('cart/addItem', params).then((data) => callback(data));
   }

   /**
    * Function removeItem() : Remove item from cart
    * 
    * @param {function()} callback 
    * @param {number} id 
    */
   removeItem(callback, id) {
       if (debug) console.log(`${this.constructor.name}::removeCartItem('${id}'`);

       this.api.post('cart/removeItem', { id }).then((data) => callback(data));
   }
}