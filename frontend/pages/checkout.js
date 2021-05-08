/**
 * @file: pages/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */
import { Page } from 'MODULES';

/**
 * @memberOf pages
 */
export class Checkout extends Page {
	static getNamespace() {
		return 'Pages'
	}

	static getName() {
		return 'Pages/Checkout';
	}

	initialize( options ) {
		super.initialize( options );

		this.logger.name = Checkout.getName();
		this.logger.startWith( { options } );
	}

	_render() {
		return (`
            <div class="checkout">
                <h1 style="text-align: center">Checkout</h1>
            </div>
        `);
	}
}

export default Checkout;
