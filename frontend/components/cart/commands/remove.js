/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Remove item from cart.
 */

/* global $flow */

export class Remove extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Cart/Commands/Remove';
	}

	/**
	 * @override
	 *
	 * @param {{}} args
	 * @param {Model} args.model
	 * @param {{}} options
	 */
	async apply( args, options ) {
		const id = args.model.id,
			{ model } = $flow.managers.controllers.get( 'Components/Cart/Controller' ),
		    result = await $flow.managers.data.update( 'Components/Cart/Data/Remove', { id } );

		// Find item being removed.
		const item = model.items.find( ( filteredItem ) => filteredItem.model.id === id );

		// Filter out item being removed.
		model.items = model.items.filter( ( filteredItem ) => filteredItem.model.id !== id );

		// Remove item from dom.
		item.remove();

		return result;
	}
}
