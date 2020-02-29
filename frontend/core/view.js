/**
 * @file: core/view.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Element from './element.js';

/**
 * @memberOf core
 */
export class View {
    /**
     * @type {core.Element}
     */
    element;

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
        this.element.render();
    }
}

export default View;
