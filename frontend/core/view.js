/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import Element from './element.js';
import Core from "CORE/base/core";
import ForceMethod from "CORE/errors/force-method";

/**
 * @memberOf core
 */
export class View extends Core {
	/**
	 * @type {core.Element}
	 */
	element;

	static getName() {
		return 'Core/View';
	}

	constructor( parent, options = {} ) {
		super();

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
		throw new ForceMethod( this, 'template' );
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
