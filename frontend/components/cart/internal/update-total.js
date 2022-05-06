/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for update total elements in cart (UPDATES VIEWS ONLY).
 */
export class UpdateTotal extends ( $flow.commandBases.CommandInternal ) {
	static getName() {
		return 'Components/Cart/Internal/UpdateTotal';
	}

	/**
	 * @override
	 * @return {number}
	 */
	apply( args, options ) {
		/**
		 * @type {CartComponent}
		 */
		const component = this.getController().getComponent(),
			totalPrice = component.model.getTotal(),
			totalPriceElement = component.elements.totalPrice();

		if ( totalPriceElement ) {
			totalPriceElement.element.innerText = totalPrice
		}

		return parseInt( totalPrice );
	}
}

export default UpdateTotal;
