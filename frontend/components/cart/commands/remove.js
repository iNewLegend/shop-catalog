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
	async apply( args = this.args, options = this.options ) {
		this.logger.startWith( { component: args.component } );

		const { component } = args,
			{ id } = component,
			model = this.getController().getModel();

		return $core.data.post( 'Components/Cart/Data/Remove', { id } ).then( () => {
			// Remove cart.
			model.items = model.items.filter( ( filteredItem ) => filteredItem !== component );

			// Remove item from dom.
			component.remove();

			// Notify onchange, TODO: Remove.
			component.options.parentComponent.onChange();
		} );
	}
}
