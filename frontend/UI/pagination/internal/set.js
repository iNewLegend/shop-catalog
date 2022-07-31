/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Add catalog item.
 */

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

	/**
	 * @override
	 * @param {PaginationData} args
	 * @param {Object} options
	 */
	apply( args, options ) {
		// All the logic is side effects of the UI.
	}
}
