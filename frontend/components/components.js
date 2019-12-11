/**
 * @file: js/components/components.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Components Namespace O__o
 */

import Catalog from './catalog.js';
import Cart from './cart.js';
 
const Components = {};

Components.Catalog = Catalog;
Components.Cart = Cart;

export default Components;

export { Catalog, Cart };