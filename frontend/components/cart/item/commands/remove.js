/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Tells the cart to remove item.
 */
export class Remove extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Cart/Item/Commands/Remove';
	}

	apply() {
		// Affect `Components/Cart/Commands/Remove`.
	}
}
