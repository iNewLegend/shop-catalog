/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import * as commands from './commands/';

import Model from './model.js';

import $mvc from "@appsflow/mvc";

export default class Controller extends $mvc.Controller {
	static getName() {
		return 'Components/Sidebar/Controller';
	}

	static getModelClass() {
		return Model;
	}

	getCommands() {
		return commands;
	}
}
