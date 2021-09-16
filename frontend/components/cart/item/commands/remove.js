/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Tells the cart to remove item.
 */

/**
 * @memberOf components.cart.item.commands
 */
export class Remove extends $core.commands.Command {
	static getName() {
		return 'Components/Cart/Item/Commands/Remove';
	}

	apply() {
		// Affect `Components/Cart/Commands/Remove`.
	}
}
