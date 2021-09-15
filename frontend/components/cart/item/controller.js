/**
 * @file: components/cart/item/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart.
 */
import * as commands from "./commands/";

/**
 * @memberOf components.cart.item
 */
export class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Cart/Item/Controller';
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
