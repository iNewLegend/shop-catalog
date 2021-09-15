/**
 * @file: components/catalog/product/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import ControllerBase from 'CORE/controllers/controller';
import * as commands from "./commands/";

/**
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {
	constructor() {
		super();

		$core.commands.onAfterAffect( 'Components/Catalog/Product/Commands/Add', 'Components/Catalog/Commands/Add' );
	}

	static getName() {
		return 'Components/Catalog/Product/Controller';
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
