/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

/* global $flow */

/**
 * @typedef PaginationData pagination data.
 * @property {number} current current page.
 * @property {number} total total amount of items.
 * @property {number} pages amount of pages.
 * @property {number} perPage amount of pages per page.
 */
export class Set extends ( $flow.commandBases.CommandInternal ) {
	static getName() {
		return 'UI/Pagination/Internal/Set';
	}

	apply( args, options) {
		// All the logic is side effects of the UI, located in the controller.
		// For the logs.
		return `applied: ${ this.constructor.getName() }`;
	}
}
