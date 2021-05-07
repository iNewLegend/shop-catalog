/**
 * @file: core/element/base.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Context from '../context.js';

/**
 * @memberOf core;
 * @name ElementBase
 */
export class Base {
    /**
     * @type {HTMLElement}
     */
    element;

	/**
	 * @type {Object}
	 */
	options;

    /**
     * Function constructor() : Create Custom Element.
     *
     * @param {Node|HTMLElement|Base} parent
     * @param {String|HTMLElement|Context} context
     * @param {{}} [options={}]
     */
    constructor( parent, context, options = {} ) {
        if ( !parent ) {
            throw Error( 'parent is required.' );
        }

        this.context = context;
        this.parent = parent;
	    this.options = options;

        if ( context instanceof HTMLElement ) {
            this.element = context;
        } else if ( !(context instanceof Context) ) {
            context = new Context( this.context );
        } else {
            throw Error( 'context is invalid' );
        }

        this.context = context;

        this.beforeInit();

        this.initialize( options );

        this.afterInit();
    }

    static getNamespace() {
        return 'Core/Element'
    }

    static getName() {
        return 'Core/Element/Base';
    }

    initialize( options = {} ) {
    }

    render( preventDefault = false ) {
        if ( !preventDefault ) this.beforeRender();

        let parent = this.parent;

        if ( parent instanceof Base ) {
            parent = this.parent.element;
        }

        // If its instance of HTMLElement then we assume it was rendered before.
        if ( this.context instanceof HTMLElement && this.context.isConnected ) {
            // Re-render.
            parent.removeChild( this.context );

            // Render
            parent.appendChild( this.context );
        } else if ( this.context instanceof Context ) {
            // Do not remove if its not attached to DOM.
            if ( this.element && this.element.isConnected ) {
                parent.removeChild( this.element );
            }

            // Render.
            this.element = parent.appendChild( this.context.create() );
        }

        if ( ! preventDefault ) this.afterRender();

        return this.element;
    }

    beforeInit() {}
    afterInit() {};

    beforeRender() {}
    afterRender() {}
}

export default Base;
