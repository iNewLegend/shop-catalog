/**
 * @file: components/catalog/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import ControllerBase from 'CORE/controllers/controller';

import * as data from './data/';
import * as commands from './commands/';

/**
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {
	static getNamespace() {
		return 'Components/Catalog/Controller'
	}

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
