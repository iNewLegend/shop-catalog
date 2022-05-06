/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Remove item from cart.
 */

export class Remove extends $flow.commands.Command {
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

		return $flow.data.post( 'Components/Cart/Data/Remove', { id } ).then( () => {
			// Find item that being removed.
			const item = model.items.find( ( filteredItem ) => filteredItem.model.id === id );

			// Filter out item that being removed.
			model.items = model.items.filter( ( filteredItem ) => filteredItem.model.id !== id );

			// Remove item from dom.
			item.remove();
		} );
	}
}
