import Container from './container.js';

export class Component extends Container {
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
        const Nodes = [this.context.node, ...this.context.node.childNodes];

        Nodes.forEach( ( node ) => {
            // Now u need loop all over on shit :)
            for ( let i in node ) {
                if ( i.startsWith( 'on' ) && node[ i ] ) {
                    // here u wanted to eval onclick.
                    let funcContent = node[ i ].toString();

                    funcContent = funcContent.replace( 'this', 'from' );
                    funcContent = funcContent.split( '{' )[ 1 ].replace( '}', '' );

                    node[ i ] = () => eval( funcContent );
                }
            }
        } );
    }

    click( callback ) {
        this.attachListener( 'onClick', callback );
    }
}

export default Component;
