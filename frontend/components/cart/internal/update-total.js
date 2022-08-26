/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command to update total elements in cart (UPDATES VIEWS ONLY).
 */

/* global $flow */

export class UpdateTotal extends ( $flow.commandBases.CommandInternal ) {
	static getName() {
		return 'Components/Cart/Internal/UpdateTotal';
	}

	apply( args, options ) {
		const controller = $flow.managers.controllers.get( 'Components/Cart/Controller' ),
			totalPrice = controller.model.getTotal(),
			totalPriceElement = $flow.Factory.getElementRef( 'Components/Cart/Component/TotalPrice' );

		if ( totalPriceElement ) {
			totalPriceElement.element.innerText = totalPrice
		}

		return parseInt( totalPrice );
	}
}

export default UpdateTotal;
