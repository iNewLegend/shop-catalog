/**
 * @file: core/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import * as core from 'CORE';
import Core from "CORE/base/core";

/**
 * @memberOf core
 */
export class Component extends Core {
	static DEATH_MONITOR_INTERVAL = 1000;

	constructor( parent, options = {} ) {
		super();

		this.parent = parent;
		this.options = options;

		let { model } = options;

		if ( ! model ) {
			const ModelClass = this.constructor.getModelClass(),
				options = { owner: this };

			model = ModelClass ? new ModelClass( options ) : new core.Model( options );
		}

		/**
		 * @type {core.Model}
		 */
		this.model = model;

		this.initialize( this.options );
	}

	static getName() {
		return 'Core/Component';
	}

	static getControllerClass() {
		return null;
	}

	static getModelClass() {
		return null;
	}

	initialize( options ) {
		let { view } = options;

		if ( ! view ) {
			const template = this.template() || this.options.template || '<div>_EMPTY_TEMPLATE_</div>';
			view = new core.View( this.parent, { template } );
		}

		/**
		 * @type {core.View}
		 */
		this.view = view;

		/**
		 * @type {core.controllers.Controller|modules.Component}
		 */
		this.controller = this.getController();

		// Link context.
		this.context = view.element.context;

		// Support JSX.
		if ( false === this.context.isConnected ) {
			this.parent.context.append( this.context );
		}

		this.hookAttachListeners();
	}

	hookAttachListeners() {
		if ( this.context.isConnected ) {
			core.Element.prototype.attachListenersFromContext.call( this.view.element, this.context, this );
		}

		this.view.element.afterRender = () => {
			core.Element.prototype.afterRender.call( this.view.element, false );
			core.Element.prototype.attachListenersFromContext.call( this.view.element, this.context, this );
		};
	}

	beforeRender() {}

	template() {}

	render() {
		if ( ! this.deathMonitor ) {
			this.deathMonitor = setInterval( () => {
				if ( ! this.view.element.element.isConnected ) {
					this.model.destroy();

					clearInterval( this.deathMonitor );
				}
			}, Component.DEATH_MONITOR_INTERVAL );
		}

		this.beforeRender();

		this.view.render();

		this.afterRender();
	}

	afterRender() {}

	show() {
		this.view.element.show();
	}

	hide() {
		this.view.element.hide();
	}

	remove() {
		if ( this.view ) {
			this.view.destroy();
		}

		if ( this.model ) {
			this.model.destroy();
		}
	}

	/**
	 * @returns {core.controllers.Controller|modules.Component}
	 */
	getController() {
		const ControllerClass = this.constructor.getControllerClass();

		if ( ControllerClass ) {
			return $core.controllers.get( ControllerClass.getName() ) ||
				$core.controllers.register( new ControllerClass( this ), this.model );
		}

		return this.options.controller || this;
	}
}

export default Component;
