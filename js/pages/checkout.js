
import Modules from '../modules/modules.js';

export default class Checkout extends Modules.Page {
    _render() {
        return (`
            <div class="checkout">
                <h1 style="text-align: center">Checkout</h1>
            </div>
    `);
    }
}