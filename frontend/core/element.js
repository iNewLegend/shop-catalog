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

        // if ( this.context instanceof HTMLElement ) {
        //     this.attachListenersFromHTMLElement( this.context );
        // }

        this.children = [];

        this.afterInit();
    }

    beforeInit() {
    }

    afterInit() {
    }

    afterRender( attachListeners = true ) {
        super.afterRender();

        this.parseChildren();

        if ( attachListeners ) {
            this.attachListeners();
        }
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

    attachListenersFromHTMLElement( element, controller = this ) {
        let elements = {};

        if ( element.childNodes ) {
            elements = { element, ...element.childNodes };
        } else {
            elements = { element };
        }

        Object.values( elements ).forEach( ( currentElement ) => {
            if ( currentElement !== element ) {
                if ( currentElement instanceof HTMLElement ) {
                    this.attachListenersFromHTMLElement( currentElement, controller );
                }

                for ( const entity in currentElement ) {
                    if ( entity.startsWith( 'on' ) ) {
                        currentElement[ entity ] = this.evalHandlers( currentElement[ entity ], controller );
                    }
                }
            }
        } );
    }

    /**
     * TODO: YOU STUCK BCOZ attachListeners not working at alll.
     * @param {Context} context
     */
    attachListenersFromContext( context ) {
        // Attach All `context` element events, to `target` component.
        let nodes = [];

        if ( context.node ) {
            nodes = [context.node];
        }

        if ( nodes.length > 0 && context.node.childNodes ) {
            nodes = [nodes, ...context.node.childNodes];
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

    evalHandlers( property, controller ) {
        if ( property && property.toString().includes( 'this' ) ) {
            let funcContent = property.toString();

            funcContent = funcContent.replace( new RegExp( 'this', 'g'), 'from' );
            funcContent = funcContent.split( '{' )[ 1 ].replace( '}', '' );
            funcContent = funcContent.replace( '()', '( ... arguments)' );


            // In other words recreate the callback.
            property = ( event, from = controller ) => {
                eval( funcContent )
            };
        }

        return property;
    }

    parseChildren() {
        this.children = [];

        for ( const children of this.element.children ) {
            this.children.push( new Element( this.element, children ) );
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

    fadeIn() {
        const el = this.element;

        el.style.opacity = 0;
        el.style.display = "block";

        (function fade() {
            let val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    fadeOut(){
        const el = this.element;

        el.style.opacity = 1;

        (function fade() {
            if ( ( el.style.opacity -= .1 ) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame( fade );
            }
        })();
    }
}

export default Element;
