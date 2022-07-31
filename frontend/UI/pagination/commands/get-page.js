/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Set pagination according the page.
 */

export class GetPage extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'UI/Pagination/Commands/GetPage';
	}

	apply( { page }, options ) {
		// Nothing todo, just hook it when needed.
	}
}
