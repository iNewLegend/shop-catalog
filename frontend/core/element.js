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
            this.attachListeners();
        }

        this.afterInit();
    }

    beforeInit() {
    }

    afterInit() {
    }

    afterRender() {
        super.afterRender();

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

    attachListeners( from = this ) {
        // Handle all parent properties if startsWith 'on' then attach it listener.
        // Allow you extend components with custom callbacks.
        Object.getOwnPropertyNames( from ).forEach( ( method ) => {
            if ( method.startsWith( 'on' ) ) {
                this.attachListener( method, from[ 'onClick' ] );
            }
        } );

        // Attach All `this.context` elements events to `from` component.
        let nodes = [];

        if ( this.context.node ) {
            nodes = [this.context.node];
        }

        if ( nodes.length > 0 && this.context.node.childNodes ) {
            nodes = [nodes, ...this.context.node.childNodes];
        }

        nodes.forEach( ( node ) => {
            // Now u need loop all over on shit :)
            for ( let i in node ) {
                if ( i.startsWith( 'on' ) && node[ i ] ) {
                    // here u wanted to eval onclick.
                    let funcContent = node[ i ].toString();

                    funcContent = funcContent.replace( 'this', 'from' );
                    funcContent = funcContent.split( '{' )[ 1 ].replace( '}', '' );
                    funcContent = funcContent.replace( '()', '( ... arguments)' );

                    node[ i ] = () => eval( funcContent );
                }
            }
        } );
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
