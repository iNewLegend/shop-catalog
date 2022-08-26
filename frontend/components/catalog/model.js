/**
 * @file: components/catalog/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges catalog model.
 */

/* global $flow */

export default class Model extends $flow.Model {
	/**
	 * Loaded items to be rendered.
	 *
	 * @type {CatalogComponent[]|import('@appflux/mvc/dist/model/array-class').default}
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
