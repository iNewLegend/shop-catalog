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

        // Alias.
        this.context = view.element.context;

        // Disable default attach Listeners from element.
        this.view.element.afterRender = () => {
            core.Element.prototype.afterRender.call( this.view.element, false );
            core.Element.prototype.attachListenersFromHTMLElement.call( this.view.element, this.view.element.element, this.controller );
        };

        // Attach listeners of view.element to the controller.
        // this.view.element.attachListeners = () => {
        //     return core.Element.prototype.attachListeners.call( this.view.element, this.controller );
        // }

        // Attach listeners of view.element to the controller.
        // this.view.element.attachListenersFromHTMLElement = () => {
        // }
    }

    beforeRender() {

    }

    template() {

    }

    render() {
        this.beforeRender();

        this.view.render();

        this.afterRender();
    }

    afterRender() {
    }

    show() {
        this.view.element.show();
    }

    hide() {
        this.view.element.hide();
    }

    remove() {
        const element = this.view.element,
            parentElement = element.parent.element;

        parentElement.removeChild( element.element );
    }
}

export default Component;
