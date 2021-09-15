/**
 * @file: components/cart/commands/remove.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Remove item from cart.
 */

/**
 * @memberOf components.cart.commands
 */
export class Remove extends $core.commands.Command {
	static getNamespace() {
		return 'Components/Cart/Commands'
	}

	static getName() {
		return 'Components/Cart/Commands/Remove';
	}

	/**
	 * @override
	 *
	 * @param {{}} args
	 * @param {components.cart.item.Component} args.component
	 * @param {{}} options
	 */
	async apply( args, options ) {
		const id = args.model.id,
			model = this.getController().getModel();

		return $core.data.post( 'Components/Cart/Data/Remove', { id } ).then( () => {
			// Remove cart.
			model.items = model.items.filter( ( filteredItem ) => filteredItem.model.id !== id );
		} );
	}
}
