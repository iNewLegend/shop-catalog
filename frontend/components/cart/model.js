/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart items/data.
 */
import $mvc from "@appsflow/mvc";

export default class Model extends $mvc.Model {
	/**
	 * State of the cart, open/closed.
	 *
	 */
	state = this.boolean();

	/**
	 * @inheritDoc
	 *
	 * Loaded items to be rendered.
	 *
	 * @type {Component[]|import('@appsflow/mvc/dist/src/model/array-class').default}
	 */
	items = this.array();

	static getName() {
		return 'Components/Cart/Model';
	}

	/**
	 * Function getById() : Get Item key from cart by id.
	 *
	 * @param {number} id
	 *
	 * @return {CartComponent}
	 */
	getById( id ) {
		this.logger.startWith( { id } );

		return this.items.find( ( /* CartComponent */ item ) => item.model.id === id );
	}

	getTotal() {
		let totalPriceOfAllItems = 0;

		this.items.forEach( ( item ) => {
			totalPriceOfAllItems += item.model.getTotal()
		} )

		return totalPriceOfAllItems.toFixed( 2 ).toString();
	}
}
