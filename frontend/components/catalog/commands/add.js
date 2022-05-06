/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Add catalog item.
 */

export class Add extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Catalog/Commands/Add';
	}

	apply( args, options ) {
		// Get effected by `Components/Catalog/Product/Commands/Add`.
	}
}
