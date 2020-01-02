import BaseElement from './base-element.js';

export class Container extends BaseElement {

	constructor( parent, context, options ) {
		super( parent, context, options );

	}

    initialize() {
	    this.events = {
		    onRender: () => {},
	    }

        super.initialize();
    }

    afterRender() {
        super.afterRender();

        if ( this.events && this.events.onRender ) {
            this.events.onRender( this.child );
        }
    }

	/**
	 *
	 * @param {Container} child
	 */
	set( child ) {
    	if ( ! ( child instanceof Container ) ) {
    	    throw new Error();
	    }

		this.child = child;

	}

	render() {
		this.beforeRender();
		super.beforeRender();

		// Self Re-render.
		super.render( true );

		// Re-render of child.
		if ( this.child ) {
			this.child.render();
		}

		this.afterRender();
		super.afterRender();
	}

    /**
     * Function on() : Declare event callback
     *
     * @param {'render'} event
     * @param {{function()}} callback
     */
    on(event, callback) {
        switch (event) {
            case 'render': {
                this.events.onRender = callback;
            } break;

            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
            }
        }
    }
}

export default Container;
