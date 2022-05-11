/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as commands from "./commands/";
import * as internal from './internal/';

export class Controller extends $flow.Controller {
	static getName() {
		return 'Components/Catalog/Pagination/Controller';
	}

	getCommands() {
		return commands;
	}

	getInternal() {
		return internal
	}
}

export default Controller;
