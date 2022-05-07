/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import { ForceMethod } from './errors/force-method';
import { Element } from './element';

import Core from './base/core';

export class View extends Core {
	/**
	 * @type {Element}
	 */
	element;

	isRenderOnce = false;

	static getName() {
		return 'Flow/View';
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

	initialize( options ) {}

	template() {
		throw new ForceMethod( this, 'template' );
	}

	render() {
		this.isRenderOnce = true;
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
