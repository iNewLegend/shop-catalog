/**
 * @file: core/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import * as core from 'CORE';
import Core from "CORE/base/core";
import Controllers from "CORE/controllers";
import ForceMethod from "CORE/errors/force-method";

/**
 * @memberOf core
 */
export class Component extends Core {
	constructor( parent, options = {} ) {
		super();

		this.parent = parent;
		this.options = options;

		this.initialize( this.options );
	}

	static getNamespace() {
		return 'Core'
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
		let { model, view } = options;

		if ( ! model ) {
			const ModelClass = this.constructor.getModelClass();

			model = ModelClass ? new ModelClass( options ) : new core.Model( options );
		}

		if ( ! view ) {
			const template = this.template() || this.options.template || '<div>_EMPTY_TEMPLATE_</div>';
			view = new core.View( this.parent, { template } );
		}

		// TODO: move to class instead in initialize.
		/**
		 * @type {core.Model}
		 */
		this.model = model;
		/**
		 * @type {core.View}
		 */
		this.view = view;

		this.controller = this.getController();

		// Alias.
		this.context = view.element.context;

		// Support JSX.
		if ( false === this.context.isConnected ) {
			this.parent.context.append( this.context );
		}

		this.attachListeners();
	}

	/**
	 * TODO: Currently its binds the element events only to component, which is wrong.
	 */
	attachListeners() {
		this.view.element.attachListeners = () => {
			return core.Element.prototype.attachListeners.call( this.view.element, /* this.getController() */ this );
		}

		// Hook default Listeners from element.
		// Attach listeners of view.element to the controller/view ?.
		this.view.element.afterRender = () => {
			core.Element.prototype.afterRender.call( this.view.element, false );
			core.Element.prototype.attachListenersFromHTMLElement.call( this.view.element, this.view.element.element, /* this.getController() */ this );

			this.view.element.attachListeners();
		};
	}

	beforeRender() {}

	template() {}

	render() {
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
		const element = this.view.element,
			parentElement = element.parent.element;

		parentElement.removeChild( element.element );
	}

	/**
	 * @returns {core.controllers.Controller|modules.Component}
	 */
	getController() {
		const ControllerClass = this.constructor.getControllerClass();

		if ( ControllerClass ) {
			return $core.controllers.get( ControllerClass.getName() ) ||
				$core.controllers.register( new ControllerClass, this.model );
		}

		return this.options.controller || this;
	}
}

export default Component;
