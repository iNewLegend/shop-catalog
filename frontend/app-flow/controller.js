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

	/**
	 * @param {core.Component} component
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

	setupHooks() {
	}

	register() {
		/**
		 * @type {Array<Command>}
		 */
		const commands = Object.values( this.getCommands() ),
			data = Object.values( (this.getData()) ),
			internal = Object.values( (this.getInternal()) );

		this.commands = $flow.commands.register( commands, this );
		this.data = $flow.data.register( data, this );
		this.internal = $flow.internal.register( internal, this );
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
