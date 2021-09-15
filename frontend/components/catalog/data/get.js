/**
 * @file: components/catalog/data/get.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get specific items from catalog.
 */

/**
 * @memberOf components.catalog.data
 */
export class Get extends $core.data.Command {

	static getNamespace() {
		return 'Components/Catalog/Data'
	}

	static getName() {
		return 'Components/Catalog/Data/Get';
	}

	getEndpoint() {
		return 'catalog/get/{ids}';
	}
}
