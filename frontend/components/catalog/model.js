/**
 * @file: components/catalog/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges catalog model.
 */
import $mvc from "@appsflow/mvc";

export default class Model extends $mvc.Model {
	/**
	 * Loaded items to be rendered.
	 *
	 * @type {CatalogComponent[]|import('@appsflow/mvc/dist/model/array-class').default}
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
