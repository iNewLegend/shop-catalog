/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as data from './data/';
import * as commands from './commands/';

import Model from "./model";

import $flow from "@appsflow/core";

export class Controller extends $flow.Controller {
	static getName() {
		return 'Components/Catalog/Controller';
	}

	static getModelClass() {
		return Model;
	}

	getCommands() {
		return commands;
	}

	getData() {
		return data;
	}
}

export default Controller;
