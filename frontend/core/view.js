/**
 * @file: core/view.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Element from './element.js';

/**
 * @memberOf core
 */
export class View {
	/**
	 * @type {core.Element}
	 */
	element;

	constructor( parent, options = {} ) {
		this.element = new Element(
			parent,
			options.template || this.template(),
			options,
		);

		this.initialize( options );
	}

	initialize( options ) {
	}

	template() {
		// TODO Throw force template implementation.
		throw( 'no template' );
	}

	render() {
		this.element.render();
	}

	destroy() {
		const element = this.element.element;

		if ( element.isConnected ) {
			element.remove();
		}
	}
}

export default View;
