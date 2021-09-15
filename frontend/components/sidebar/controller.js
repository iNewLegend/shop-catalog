import * as commands from './commands/';

export default class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Sidebar/Controller';
	}

	getCommands() {
		return commands;
	}
}
