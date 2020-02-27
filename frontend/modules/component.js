import Core from 'CORE';

export class Component {
    /**
     *
     * @param model
     * @param {View} view
     * @param controller
     * @param options
     */
    constructor( parent, model, view, controller, options = {} ) {
        // Mode model, view, controller? assuming you create MVC component.
        if ( arguments.length === 1 ) {
            model, view, controller = this;

            view = new Core.View( parent, {
                template: this['template'],
            } );
        } else if ( arguments.length < 4 ) {
            throw Error('WTF');
        }

        this.model = model;
        this.view = view;
        this.controller = controller;
        this.options = options;

        this.initialize( this.options );
    }

    initialize( options ) {
        // Attach listeners of view.element to the controller.
        this.view.element.attachListeners = () => {
            return Core.Element.prototype.attachListeners.call( this.view.element, this.controller );
        }
    }

    render() {
        this.view.render();
    }
}

export default Component;
