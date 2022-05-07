/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Tells the cart request checkout.
 */
export class Checkout extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Cart/Commands/Checkout';
	}

	apply() {
		// Nothing todo, just hook it when needed.
	}
}
