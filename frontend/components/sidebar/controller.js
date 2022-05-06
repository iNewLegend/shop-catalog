/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import * as commands from './commands/';

export default class Controller extends $flow.Controller {
	static getName() {
		return 'Components/Sidebar/Controller';
	}

	getCommands() {
		return commands;
	}
}
