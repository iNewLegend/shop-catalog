/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get specific items from catalog.
 */

/**
 * @memberOf components.catalog.data
 */
export class Get extends $core.data.Command {
	static getName() {
		return 'Components/Catalog/Data/Get';
	}

	getEndpoint() {
		return 'catalog/get/{ids}';
	}
}
