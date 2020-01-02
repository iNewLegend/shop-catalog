/**
 * @file: js/pages/pages.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: pages Namespace O__o
 */

import Catalog from './catalog.js'
import Checkout from './checkout.js';

const Pages = {};

Pages.Catalog = Catalog;
Pages.Checkout = Checkout;

export default Pages;

export { Catalog, Checkout };