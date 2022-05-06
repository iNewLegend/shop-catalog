/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging controllers, Part of MVC.
 */
import { ControllerAlreadyRegistered } from './errors/';
import { Core } from './base/core';

export default class Controllers extends Core {
	/**
	 * @type {Object.<$flow.Controller>}
	 */
	controllers = {};

	static getName() {
		return 'Core/Controllers';
	}

	/**
	 * @param {string} name
	 * @return {$flow.Controller}
	 */
	get( name ) {
		return this.controllers[ name ];
	}

	/**
	 * @param {$flow.Controller} controller
	 * @param {$flow.Model} model
	 *
	 * @return {$flow.Controller}
	 */
	register( controller, model ) {
		if ( this.controllers[ controller.getName() ] ) {
			throw new ControllerAlreadyRegistered( controller );
		}

		if ( model ) {
			controller.constructor.model = model;
		}

		// Register.
		this.controllers[ controller.getName() ] = controller;

		return controller;
	}
}
