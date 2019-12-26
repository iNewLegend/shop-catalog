import Context from './context';

// Aka Manager of Context.
export class BaseElement {
    /**
     * Function constructor() : Create Custom Element.
     *
     * @param {Node|Container} parent
     * @param {Context|String} context
     */
    constructor(parent, context) {

        if (!parent) {
            throw Error('parent is required.');
        }

        this.context = context;
        this.parent = parent;


        if ( ! (context instanceof Context)) {
            context = new Context( this.context );
        }

        this.context = context;
        this.args = arguments;

        this.beforeInit();

        this.initialize( this.args[ 2 ] );

        this.afterInit();
    }

    initialize( options = {} ) {}

    render( preventDefault = false ) {
        if ( ! preventDefault ) this.beforeRender();

        if ( this.parent instanceof BaseElement ) {
            this.parent = this.parent.element;
        }

        this.element = this.parent.appendChild( this.context.create() );

        if ( ! preventDefault ) this.afterRender();

        return this.element;
    }

    beforeInit() {}
    afterInit() {};

    beforeRender() {}

    afterRender() {}
}

export default BaseElement;
