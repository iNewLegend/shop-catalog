/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as data from './data/';
import * as commands from './commands/';

export class Controller extends $flow.Controller {
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
