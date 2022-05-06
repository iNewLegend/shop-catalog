/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import { Model } from './model';
import { View } from './view';
import { Element } from './element';

import Core from './base/core';

/**
 * @name $flow.Component
 */
export class Component extends Core {

	static getName() {
		return 'Flow/Component';
	}

	static getControllerClass() {
		return null;
	}

	static getModelClass() {
		return null;
	}

	constructor( parent, options = {} ) {
		super();

		this.parent = parent;
		this.options = options;

		let { model } = options;

		if ( ! model ) {
			const ModelClass = this.constructor.getModelClass(),
				options = { owner: this };

			model = ModelClass ? new ModelClass( options ) : new Model( options );
		}

		/**
		 * @type {$flow.Model}
		 */
		this.model = model;

		this.initialize( this.options );
	}

	initialize( options ) {
		let { view } = options;

		if ( ! view ) {
			const template = this.template() || this.options.template || '<div>_EMPTY_TEMPLATE_</div>';

			this.options.template = template;

			view = new View( this.parent, { template } );
		}

		/**
		 * @type {$flow.View}
		 */
		this.view = view;

		/**
		 * @type {$flow.Controller}
		 */
		this.controller = this.getController();

		// Link context.
		this.context = view.element.context;

		this.hookAttachListeners();
	}

	hookAttachListeners() {
		if ( this.context.isConnected ) {
			Element.prototype.attachListenersFromContext.call( this.view.element, this.context, this );
		}

		this.view.element.afterRender = () => {
			Element.prototype.afterRender.call( this.view.element, false );
			Element.prototype.attachListenersFromContext.call( this.view.element, this.context, this );
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
		if ( this.view ) {
			this.view.destroy();
		}

		if ( this.model ) {
			this.model.destroy();
		}
	}

	/**
	 * @returns {$flow.Controller}
	 */
	getController() {
		const ControllerClass = this.constructor.getControllerClass();

		if ( ControllerClass ) {
			return $flow.managers.controllers.get( ControllerClass.getName() ) ||
				$flow.managers.controllers.register( new ControllerClass( this ), this.model );
		}

		return this.options.controller || this;
	}
}

export default Component;
