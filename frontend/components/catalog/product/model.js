/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges one product unit.
 */

export default class Model extends $flow.Model {
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

	static getName() {
		return 'Components/Catalog/Product/Model';
	}
}
