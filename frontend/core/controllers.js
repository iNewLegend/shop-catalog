/**
 * @file: core/controllers.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging controllers, Part of MVC.
 */
import Core from "CORE/base/core";
import ControllerAlreadyRegistered from "CORE/controllers/errors/controller-already-registered";
import Controller from "CORE/controllers/controller";

/**
 * @memberOf core
 */
export default class Controllers extends Core {
	Controller = Controller;

	/**
	 * @type {Object.<core.controllers.Controller>}
	 */
	controllers = {};

	static getNamespace() {
		return 'Core';
	}

	static getName() {
		return 'Core/Controllers';
	}

	/**
	 * @param {string} name
	 * @return {core.controllers.Controller}
	 */
	get( name ) {
		return this.controllers[ name ];
	}

	/**
	 * @param {core.controllers.Controller} controller
	 * @param {core.Model} model
	 *
	 * @return {core.controllers.Controller}
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
