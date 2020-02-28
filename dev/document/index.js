import Component from './modules/component';

class Container extends Component {
    initialize() {
        this.events = {
            onRender: () => {},
        }

        super.initialize();
    }

    afterRender() {
        super.afterRender();

        this.events.onRender();
    }

    set( child ) {
        this.child = child;
        this.child.render();
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
                this.events.onAfterRender = callback;
            } break;

            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
            }
        }
    }
}

class Page extends Container {

}

class PageContainer extends Container {

}

class CatalogPage extends Page {
    onClick = () => {
        alert( 'page home');
    };
}



class App {
    initialize() {
        this.elements = {
            root: document.getElementById('root'),
        };

        this.app = new Component(this.elements.root, `<div class="app">App</div>`);

        this.pageContainer = new PageContainer( this.app, '<div class="page">Page Container</div>' );

        this.pageContainer.on('render', this.onPageContainerRender.bind( this ) );

        this.homePage = new CatalogPage( this.pageContainer, '<div class="homepage">Home Page</div>')

        this.app.render();

        this.pageContainer.render();

        this.pageContainer.set( this.homePage );

    }

    onPageContainerRender() {
        console.log('onPageContainerRender');
    }
}

const app = new App();

app.initialize();


