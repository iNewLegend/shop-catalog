/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart.
 */
import * as commands from "./commands/";
import * as internal from "./internal/";

import Model from "./model";

import { getController } from "@appflux/core";

/* global $flow */

/**
 * @property {Model} model
 */
export class Controller extends getController() {
	static getName() {
		return 'Components/Cart/Item/Controller';
	}

	static getModelClass() {
		return Model;
	}

	getCommands() {
		return commands;
	}

	getInternal() {
		return internal;
	}
}

export default Controller;
