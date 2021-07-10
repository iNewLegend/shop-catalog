/**
 * @file: components/cart/internal/toggle-empty-state.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for telling the cart its empty or not.
 */

/**
 * @memberOf components.cart.internal
 */
export class ToggleEmptyState extends $core.internal.Command {
	static getNamespace() {
		return 'Components/Cart/Internal'
	}

	static getName() {
		return 'Components/Cart/Internal/ToggleEmptyState';
	}

	apply( args, options ) {
		const component = this.getController().getComponent(),
			{ state } = args,
			{ empty, checkout, itemsTotal } = component.elements;

		if ( state ) {
			empty.hide();

			checkout.addClass( 'open' );
			itemsTotal.addClass( 'open' );
		} else {
			empty.show();

			checkout.removeClass( 'open' );
			itemsTotal.removeClass( 'open' );
		}
	}
}

export default ToggleEmptyState;
