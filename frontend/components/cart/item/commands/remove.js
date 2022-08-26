/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Tells the cart to remove item.
 */

/* global $flow */

export class Remove extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Cart/Item/Commands/Remove';
	}

	apply( args, options ) {
		// For the logs.
		return `applied: ${ this.constructor.getName() }`;
	}
}
