/**
 * @file: modules/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import * as core from 'CORE';

/**
 * @memberOf modules
 * TODO: Move to core.
 */
export class Component {
	constructor( parent, options = {} ) {
		this.parent = parent;
		this.options = options;

		this.initialize( this.options );
	}

	static getNamespace() {
		return 'Modules'
	}

	static getName() {
		return 'Modules/Component';
	}

	initialize( options ) {
		let { model, view } = options;

		if ( ! model ) {
			model = new core.Model();
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

		// Alias.
		this.context = view.element.context;

		this.view.element.attachListeners = () => {
			return core.Element.prototype.attachListeners.call( this.view.element, this.getController() );
		}

		this.attachListeners();
	}

	attachListeners() {
		// Hook default Listeners from element.
		// Attach listeners of view.element to the controller.
		this.view.element.afterRender = () => {
			core.Element.prototype.afterRender.call( this.view.element, false );
			core.Element.prototype.attachListenersFromHTMLElement.call( this.view.element, this.view.element.element, this.getController() );

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

	getController() {
		return this.options.controller || this;
	}
}

export default Component;
