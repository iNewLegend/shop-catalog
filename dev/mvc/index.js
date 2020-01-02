import * as DocumentModules from '../../frontend/modules/document/index.js';

class PageContainer extends DocumentModules.Container {

}

class Page extends DocumentModules.Container {

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

        this.app = new DocumentModules.Component(this.elements.root, `<div class="app">App</div>`);

        this.pageContainer = new PageContainer( this.app, '<div class="page">Page Container</div>' );

        this.pageContainer.on('render', this.onPageContainerRender.bind( this ) );

        this.homePage = new CatalogPage( this.pageContainer, '<div class="homepage">Home Page</div>')

        this.app.render();

        this.pageContainer.render();

        this.pageContainer.set( this.homePage );
    }

	onPageContainerRender() {
    	console.log( 'onPageContainerRender' );
	}

}

const app = new App();

app.initialize();


