import Component from './component.js';

export class View {
	constructor( parent, options = { } ) {
		this.component = new Component(
			parent,
			this.template(),
			options,
		);

		this.initialize( options );
	}

	initialize( options ) {
		// Attach listeners of component to the view.
		this.component.attachListeners = () => {
			return Component.prototype.attachListeners.call( this.component, this );
		}
	}

	/**
	 * @return {String} HTML Markup.
	 */
	template() {}


	render() {
		return this.component.render();
	}
}
