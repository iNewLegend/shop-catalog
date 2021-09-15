/**
 * @file: components/catalog/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as data from './data/';
import * as commands from './commands/';

/**
 * @memberOf components.catalog
 */
export class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Catalog/Controller';
	}

	getCommands() {
		return commands;
	}

	getData() {
		return data;
	}
}

export default Controller;
