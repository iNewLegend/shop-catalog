/**
 * @file: core/element.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Container from './container.js';

/**
 * @memberOf core
 */
export class Element extends Container {
    static getNamespace() {
        return 'Core'
    }

    static getName() {
        return 'Core/Element';
    }

    initialize() {
        this.beforeInit();

        super.initialize();

        if ( this.context instanceof HTMLElement ) {
            this.attachListenersFromHTMLElement( this.context );
        }

        this.chhildren = [];

        this.afterInit();
    }

    beforeInit() {
    }

    afterInit() {
    }

    afterRender() {
        super.afterRender();

        this.parseChildren();
	    this.attachListeners();
    }

    attachListener( method, callback ) {
        switch ( method ) {
            case 'onClick': {
                this.element.addEventListener( 'click', callback );
            }
            break;
        }
    }

	/**
	 * @param {Element} targetElement
	 */
	attachListeners( targetElement = this ) {
        // Handle all parent properties if startsWith 'on' then attach it listener.
        // Allow you extend components with custom callbacks.
        Object.getOwnPropertyNames( targetElement ).forEach( ( method ) => {
            if ( method.startsWith( 'on' ) ) {
                this.attachListener( method, targetElement[ 'onClick' ] );
            }
        } );

        this.attachListenersFromContext( targetElement.context );
    }

	attachListenersFromHTMLElement( element ) {
		const elements = [ element, ... element.childNodes ];

		elements.forEach( ( element ) => {
			if ( element.onclick ) {
				debugger;
			}
		} )
	}

	/**
	 * YOU STUCK BCOZ attachListeners not working at alll.
	 */
	/**
	 * @param {Context} context
	 */
	attachListenersFromContext( context ) {
	    // Attach All `context` element events, to `target` component.
	    let nodes = [];

	    if ( context.node ) {
		    nodes = [ context.node ];
	    }

	    if ( nodes.length > 0 && context.node.childNodes ) {
		    nodes = [ nodes, ...context.node.childNodes ] ;
	    } else {
	    	debugger; // Never happens?
		    nodes = context.childNodes;
	    }

	    nodes.forEach( ( node ) => {
		    for ( let i in node ) {
		    	if ( node[ 0 ] instanceof HTMLElement ) {
				    this.attachListenersFromHTMLElement( node[ 0 ] );
			    }

		    	if ( i.startsWith( 'on' ) && node[ i ] ) {
		    		debugger;
				    this.evalHandlers( node[ i ] );
			    }
		    }
	    } );
    }

	evalHandlers( node ) {
		if ( node ) {
			// here u wanted to eval onclick.
			let funcContent = node.toString();

			funcContent = funcContent.replace( 'this', 'from' );
			funcContent = funcContent.split( '{' )[ 1 ].replace( '}', '' );
			funcContent = funcContent.replace( '()', '( ... arguments)' );

			node = () => eval( funcContent );
		} {
			throw Error( 'evalHandlers: fail, reason: node empty' );
		}
	}

	parseChildren() {
		for( const children of this.element.children ) {
			this.chhildren.push( new Element( this.element, children ) );
		}
	}

    click( callback ) {
        this.attachListener( 'onClick', callback );
    }

    show() {
        this.element.classList.remove( 'hidden' )
    }

    hide() {
        this.element.classList.add( 'hidden' )
    }

    html( content ) {
        this.element.innerHTML = content.toString();
    }

    addClass( className ) {
        this.element.classList.add( className );
    }

    removeClass( className ) {
        this.element.classList.remove( className );
    }
}

export default Element;
