import Component from './component';

export class Container extends Component {
    initialize() {
        this.events = {
            onRender: () => {},
        }

        super.initialize();
    }

    afterRender() {
        super.afterRender();

        if ( this.events ) {
            this.events.onRender( this.child );
        }
    }

    set( child ) {
        this.child = child;
    }

    render() {
         super.render();

         if ( this.child ) {
            this.child.render();
         }
    }
    /**
     * Function on() : Declare event callback
     *
     * @param {'render'} event
     * @param {{function()}} callback
     */
    on(event, callback) {
        switch (event) {
            case 'render': {
                this.events.onRender = callback;
            } break;

            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
            }
        }
    }
}

export default Container;
