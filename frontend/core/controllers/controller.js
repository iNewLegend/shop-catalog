/**
 * @file: core/controllers/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Controller is part of MVC concept, responsible for actions.
 */
import ForceMethod from "CORE/errors/force-method";
import Core from "CORE/base/core";

/**
 * @memberOf core.controllers
 */
export class Controller extends Core {
	constructor() {
		super();

		this.registerCommands();
	}

	registerCommands() {
		/**
		 * @type {Array<Command>}
		 */
		const commands = Object.values( this.getCommands() );

		this.commands = $core.commands.register( commands, this );
	}

	getCommands() {
		new ForceMethod( this, 'getCommands' );
	}
}

export default Controller;
