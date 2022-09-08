/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Set pagination according the page.
 */

/* global $flow */

export class GetPage extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'UI/Pagination/Commands/GetPage';
	}

	apply( { page }, options ) {
		// Nothing todo, just hook it when needed.
		// For the logs.
		return `applied: ${ this.constructor.getName() }`;
	}
}
