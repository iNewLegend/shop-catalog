import HTML from 'DEV-LIBRARY/html';

export class Context
{
    /**
     * @type {Node}
     */
    node;

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
