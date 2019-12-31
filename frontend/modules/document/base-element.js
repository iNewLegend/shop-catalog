import Context from './context';

// Aka Manager of Context.
export class BaseElement {
    /**
     * Function constructor() : Create Custom Element.
     *
     * @param {Node|Container} parent
     * @param {Context|String|HTMLElement|} context
     */
    constructor(parent, context) {
        if (!parent) {
            throw Error('parent is required.');
        }


        this.renderOnce = false;

        this.context = context;
        this.parent = parent;

        if ( context instanceof HTMLElement ) {
        	this.element = context;
	        this.renderOnce = true;
        } else if ( ! (context instanceof Context)) {
            context = new Context( this.context );
        } else {
        	throw Error('context is invalid');
        }


        this.context = context;
        this.args = arguments;

	    this.beforeInit();

        // TODO Bad practice.
        this.initialize( this.args[ 2 ] );

        this.afterInit();
    }

    initialize( options = {} ) {}

    render( preventDefault = false ) {
        if ( ! preventDefault ) this.beforeRender();

	    if ( this.parent instanceof BaseElement ) {
		    this.parent = this.parent.element;
	    }

	    if ( this.context instanceof HTMLElement ) {
	    	// Re-render.
		    this.parent.removeChild( this.context );

		    this.parent.appendChild( this.context );
	    } else if ( this.context instanceof Context ) {
	    	if ( this.renderOnce ) {
	    		debugger; // HERE YOU STUCK: On the next time you click on checkout it does not work.
		    }

	    	if ( this.element ) {
			    this.parent.removeChild( this.element );
		    }

		    this.element = this.parent.appendChild( this.context.create() );
	    }

	    this.renderOnce = true;

        if ( ! preventDefault ) this.afterRender();

        return this.element;
    }

    beforeInit() {}
    afterInit() {};

    beforeRender() {}

    afterRender() {}
}

export default BaseElement;
