/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import * as commands from './commands/';

import Model from './model.js';
import { getController } from "@appflux/core";

export default class Controller extends getController() {
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
