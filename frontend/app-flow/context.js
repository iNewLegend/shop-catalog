/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import HTML from './utils/html';

/**
 * @name $flow.Context
 */
export class Context {
	/**
	 * @type {Node}
	 */
	node;

	static getName() {
		return 'Flow/Context';
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

		// Support JSX.
		if ( 'function' === typeof this.context ) {
			this.node = this.context();
		} else if ( this.context instanceof $flow.Element ) {
			this.node = this.context.context;
		} else {
			this.node = HTML.toNode( this.context );
		}

		this.afterCreate();

		return this.node;
	}

	beforeCreate() {}

	afterCreate() {}
}

export default Context;
