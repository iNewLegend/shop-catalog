/**
 * @file: core/context.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import HTML from '../library/html.js';

/**
 * @memberOf core
 */
export class Context {
	/**
	 * @type {Node}
	 */
	node;

	static getNamespace() {
		return 'Core'
	}

	static getName() {
		return 'Core/Context';
	}

	constructor( context ) {
		this.context = context;
	}

	/**
	 *
	 * @returns {Node}
	 */
	create() {
		this.beforeCreate();

		this.node = HTML.toNode( this.context );

		this.afterCreate();

		return this.node;
	}

	beforeCreate() {
	}

	afterCreate() {
	}
}

export default Context;
