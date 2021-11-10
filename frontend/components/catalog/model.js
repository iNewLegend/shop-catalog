/**
 * @file: components/catalog/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart items/data.
 */

/**
 * @memberOf components.catalog
 */
export default class Model extends ( $core.Model ) {
	static getName() {
		return 'Components/Catalog/Model';
	}

	/**
	 * Loaded items to be rendered.
	 *
	 * @type {components.catalog.product.Component[]}
	 */
	products = this.array();

	/**
	 * Current page number.
	 *
	 * @type {number}
	 */
	page = 0;
}
