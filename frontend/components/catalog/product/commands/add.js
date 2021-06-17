/**
 * @file: components/catalog/product/commands/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Tells the catalog to add item.
 */

/**
 * @memberOf components.catalog.product.commands
 */
export class Add extends $core.commands.Command {
	static getNamespace() {
		return 'Components/Catalog/Product/Commands'
	}

	static getName() {
		return 'Components/Catalog/Product/Commands/Add';
	}

	apply( args, options ) {
		// Affect `Components/Catalog/Commands/Add`.
		const { component } = args,
			id = parseInt( component.id ),
			amount = parseInt( component.elements.amount.value );

		let product = $core.data.get( 'Components/Catalog/Data/Index', { id }, { local: true } );

		// Assign `id` and `amount`.
		product = Object.assign( {}, product, { id, amount } );

		// Call callback
		component.events.onProductAdd( product );

		// Put it back to 1.
		component.setAmount( 1 );
	}
}
