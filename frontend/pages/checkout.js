/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */
import Page from '../modules/page';

export class Checkout extends Page {
	static getName() {
		return 'Pages/Checkout';
	}

	initialize( options ) {
		super.initialize( options );

		this.logger.name = Checkout.getName();
		this.logger.startWith( { options } );
	}

	// TODO: Check this method.
	_render() {
		return (`
            <div class="checkout">
                <h1 style="text-align: center">Checkout</h1>
            </div>
        `);
	}
}

export default Checkout;
