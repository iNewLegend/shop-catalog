/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as commands from "./commands/";

import Model from "./model";

import $mvc from "@appsflow/mvc";

export class Controller extends $mvc.Controller {
	static getName() {
		return 'Components/Catalog/Product/Controller';
	}

	static getModelClass() {
		return Model
	}

	setupHooks() {
		$flow.managers().commands.onAfterAffect(
			'Components/Catalog/Product/Commands/Add',
			'Components/Catalog/Commands/Add'
		);
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
