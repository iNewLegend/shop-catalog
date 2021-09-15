/**
 * @file: components/catalog/product/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart one product unit.
 */

/**
 * @memberOf components.catalog
 */
export default class Model extends ( $core.Model ) {

	static getName() {
		return 'Components/Catalog/Product/Model';
	}

	/**
	 * Item id.
	 */
	id = this.number();

	/**
	 * Item name.
	 */
	name = this.string();

	/**
	 * Price of current product.
	 */
	price = this.number();
}
