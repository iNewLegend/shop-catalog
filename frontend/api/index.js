/**
 * @file: js/api/api.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: API Namespace O__o
 */

import Http from './http.js';
import Websocket from './websocket.js';
import Catalog from './catalog.js';
import Cart from './cart.js';

const API = {};

API.Http = Http;
API.Websocket = Websocket;

API.Catalog = Catalog;
API.Cart = Cart;

export default API;

export { Http, Websocket, Catalog, Cart };