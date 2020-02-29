import Element from './element.js';

export class View {
    constructor( parent, options = {} ) {
        this.element = new Element(
            parent,
            options.template || this.template(),
            options,
        );

        this.initialize( options );
    }

    initialize( options ) {
    }

    template() {
        throw( 'no template' );
    }

    render() {
        return this.element.render();
    }
}
