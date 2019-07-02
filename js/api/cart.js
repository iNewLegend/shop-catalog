/**
 * @file: js/api/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import API from './api.js';

import Logger from '../modules/logger.js';

export default class API_Cart {

    /**
     * Function constructor() Create Cart Api 
     * 
     * @param {API} api
     */
   constructor(api) {
       this.logger = new Logger(this);
       this.logger.startEmpty();

       this.api = api;
   }

   /**
    * Function get() : Get cart
    * 
    * @param {function()} callback 
    */
   get(callback) {
        this.logger.startEmpty();

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
       this.logger.startWith({ id, amount });

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
        this.logger.startWith({ id });

       this.api.post('cart/removeItem', { id }).then((data) => callback(data));
   }
}