/**
 * @file: components/catalog/commands/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

/**
 * @memberOf components.catalog.commands
 */
export class Add extends $core.commands.Command {
	static getNamespace() {
		return 'Components/Catalog/Commands'
	}

	static getName() {
		return 'Components/Catalog/Commands/Add';
	}

	apply( args, options ) {
		// Get effected by `Components/Catalog/Product/Commands/Add`.
	}
}
