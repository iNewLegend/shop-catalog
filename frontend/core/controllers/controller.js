/**
 * @file: core/controllers/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Controller is part of MVC concept, responsible for actions.
 */
import Core from "CORE/base/core";

/**
 * @memberOf core.controllers
 */
export class Controller extends Core {
	static model;

	constructor() {
		super();

		this.initialize();
	}

	initialize() {
		this.register();
	}

	register() {
		/**
		 * @type {Array<Command>}
		 */
		const commands = Object.values( this.getCommands() ),
			data = Object.values( ( this.getData() ) ),
			internal = Object.values( ( this.getInternal() ) );

		this.commands = $core.commands.register( commands, this );
		this.data = $core.data.register( data, this );
		//this.internal = $core.internal.register( internal, this );
	}

	getCommands() {
		return {};
	}

	getData() {
		return {};
	}

	getInternal() {
		return {};
	}

	getModel() {
		return this.constructor.model;
	}
}

export default Controller;
