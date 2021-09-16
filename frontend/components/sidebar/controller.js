/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import * as commands from './commands/';

/**
 * @memberOf components.sidebar
 */
export default class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Sidebar/Controller';
	}

	getCommands() {
		return commands;
	}
}
