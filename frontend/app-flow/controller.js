/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Controller is part of MVC concept, responsible for actions.
 */
import Core from './base/core';

/**
 * @name $flow.Controller
 */
export class Controller extends Core {
	static model;

	static getName() {
		return 'Flow/Controller'
	}

	/**
	 * @param {$flow.Component} component
	 */
	constructor( component ) {
		super();

		this.component = component;

		this.initialize();
	}

	initialize() {
		this.register();
		this.setupHooks();
	}

	setupHooks() {}

	register() {
		/**
		 * @type {Array<Command>}
		 */
		const commands = Object.values( this.getCommands() ),
			data = Object.values( this.getData() ),
			internal = Object.values( (this.getInternal()) );

		this.commands = $flow.managers.commands.register( commands, this );
		this.data = $flow.managers.data.register( data, this );
		this.internal = $flow.managers.internal.register( internal, this );
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

	getComponent() {
		return this.component;
	}
}

export default Controller;
