/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart item unit.
 */
import $mvc from "@appsflow/mvc";

export default class Model extends $mvc.Model {
	id = this.number();
	name = this.string();
	price = this.number();
	amount = this.string();

	static getName() {
		return 'Components/Cart/Item/Model';
	}

	getTotal() {
		return this.amount * this.price;
	}
}
