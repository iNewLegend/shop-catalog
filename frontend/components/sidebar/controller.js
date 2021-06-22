import ControllerBase from 'CORE/controllers/controller';
import * as commands from './commands/';

export default class Controller extends ControllerBase {
	static getName() {
		return 'Components/Sidebar/Controller';
	}

	getCommands() {
		return commands;
	}
}
