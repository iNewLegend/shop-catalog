/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Add an item to catalog.
 */
import $flow from "@appsflow/core";

export class Add extends $flow.commandBases().CommandPublic {
	static getName() {
		return 'Components/Catalog/Product/Commands/Add';
	}

	apply( args, options ) {
		// For the logs.
		return `applied: ${ this.constructor.getName() }`;
	}
}
