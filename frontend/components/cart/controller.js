/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import * as commands from "./commands/";
import * as data from "./data/";
import * as internal from "./internal/";

import Model from './model';

import $flow from "@appsflow/core";

/**
 * @name CartController
 * @property {Model} model
 */
export class Controller extends $flow.Controller {
	static getName() {
		return 'Components/Cart/Controller';
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

	getInternal() {
		return internal;
	}

	setupHooks() {
		$flow.managers().commands.onAfterAffect(
			'Components/Cart/Item/Commands/Remove',
			'Components/Cart/Commands/Remove'
		);

		const updateTotal = () => {
			setTimeout( () => $flow.managers().internal.run( 'Components/Cart/Internal/UpdateTotal' ) );
		};

		$flow.managers().internal.onAfterUI( 'Components/Cart/Internal/Add', updateTotal );
		$flow.managers().commands.onAfterUI( 'Components/Cart/Commands/Remove', updateTotal )
	}
}

export default Controller;
