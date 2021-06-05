/**
 * @file: components/cart/internal/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for adding items to cart.
 */

/**
 * @memberOf components.cart.internal
 */
export class Add extends $core.internal.Command {
	static getNamespace() {
		return 'Components/Cart/Internal'
	}

	static getName() {
		return 'Components/Cart/Internal/Add';
	}

	apply( args, options ) {
		const { id, amount } = args.product;

		return $core.data.post( 'Components/Cart/Data/Add', { id, amount } ).then( () => {
			// TODO: Remove: doAddItem, createItem.
			args.doAddItem(
				args.createItem( args.product ),
				true,
				true
			);
		} );
	}
}

export default Add;
