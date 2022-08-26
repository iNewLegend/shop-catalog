/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as commands from "./commands/";

import Model from "./model";

import { getController } from "@appflux/core";

/* global $flow */

export class Controller extends getController() {
	static getName() {
		return 'Components/Catalog/Product/Controller';
	}

	static getModelClass() {
		return Model
	}

	setupHooks() {
		$flow.managers.commands.onAfterAffect(
			'Components/Catalog/Product/Commands/Add',
			'Components/Catalog/Commands/Add'
		);
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
