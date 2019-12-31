import Container from './container';

export class Component extends Container {
    initialize() {
        this.beforeInit();

        super.initialize();

        if ( this.context instanceof HTMLElement ) {
        	this.attachListeners();
        }

        this.afterInit();
    }

    beforeInit() {}
    afterInit() {}

    afterRender() {
        super.afterRender();

        this.attachListeners();
    }

    attachListener( method, callback )  {
	    switch( method ) {
		    case 'onClick': {
			    this.element.addEventListener( 'click', callback );
		    }
			break;
	    }
    }

    attachListeners() {
    	// Handle all parent properties if startsWith 'on' then attach it listener.
	    // Allow you extend components with custom callbacks.
        Object.getOwnPropertyNames(this).forEach( ( method ) => {
            if ( method.startsWith('on') ) {
            	this.attachListener( method, this['onClick'] );
            }
        } );
    }

    click( callback ) {
    	this.attachListener( 'onClick', callback );
    }
}

export default Component;
