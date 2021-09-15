/**
 * @file: components/catalog/product/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as commands from "./commands/";

/**
 * @memberOf components.catalog.product
 */
export class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Catalog/Product/Controller';
	}

	setupHooks() {
		$core.commands.onAfterAffect( 'Components/Catalog/Product/Commands/Add', 'Components/Catalog/Commands/Add' );
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
