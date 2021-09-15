/**
 * @file: components/catalog/product/commands/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Add an item to catalog.
 */
import * as components from "COMPONENTS/index";

/**
 * @memberOf components.catalog.product.Component.commands
 */
export class Add extends $core.commands.Command {

	static getName() {
		return 'Components/Catalog/Product/Commands/Add';
	}

	apply( args, options ) {
		// Affect `Components/Catalog/Commands/Add`.
	}
}
