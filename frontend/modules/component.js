import core from 'CORE';

// TODO: Add file signature and use of logger.
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

            view = new core.View( parent, {
                template: this[ 'template' ],
            } );
        } else if ( arguments.length < 4 ) {
            throw Error( 'WTF' );
        }

        this.model = model;
        this.view = view;
        this.controller = controller;
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
        // Attach listeners of view.element to the controller.
        this.view.element.attachListeners = () => {
            return core.Element.prototype.attachListeners.call( this.view.element, this.controller );
        }
    }

    render() {
        this.view.render();
    }
}

export default Component;
