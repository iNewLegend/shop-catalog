/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges one product unit.
 */
import $mvc from "@appsflow/mvc";

export default class Model extends $mvc.Model {
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

	constructor( options ) {
		super( options );
	}
}
