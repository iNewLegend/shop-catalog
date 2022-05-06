/**
 * @file: components/catalog/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges catalog model.
 */

export default class Model extends $flow.Model {
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

	static getName() {
		return 'Components/Catalog/Model';
	}
}
