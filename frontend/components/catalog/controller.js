/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as data from './data/';
import * as commands from './commands/';

import Model from "./model";

import $mvc from "@appsflow/mvc";

export class Controller extends $mvc.Controller {
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
