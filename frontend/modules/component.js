/**
 * @file: modules/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import * as core from 'CORE';

/**
 * @memberOf modules
 */
export class Component {
    constructor( parent, options = {} ) {
        this.parent = parent;
        this.options = options;

        this.initialize( this.options );
    }

    static getNamespace() {
        return 'Modules'
    }

    static getName() {
        return 'Modules/Component';
    }

    initialize( options ) {
        let { model, view, controller } = options;

        if ( ! model ) {
            model = new core.Model();
        }

        if ( ! view ) {
            const template = this.template() || this.options.template || '<div>_EMPTY_TEMPLATE_</div>';
            view = new core.View( this.parent, { template } );
        }

        if ( ! controller ) {
            controller = this;
        }

        this.model = model;
        this.view = view;
        this.controller = controller;
10
        // Attach listeners of view.element to the controller.
        this.view.element.attachListeners = () => {
            return core.Element.prototype.attachListeners.call( this.view.element, this.controller );
        }
    }

    beforeRender() {}
    afterRender() {}
    template() {}

    render() {
        this.beforeRender();

        this.view.render();

        this.afterRender();
    }
}

export default Component;
