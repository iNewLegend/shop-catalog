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


class Item extends DocumentModules.View {
	template() {
		return '' +
			'<div class"item">' +
				'<h1 onClick="this.onItemClick()">Item</h1>' +
                '<input type="text" onchange="this.onInputChanged( event )">' +
			'</div'
		;
	}

	onInputChanged( event ) {
	    debugger;
    }

	onItemClick() {
		alert('on item heading click');
	}

	onClick = () => {
		alert('Hello from item class view');
	 }
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

	    this.pageContainer.set( this.homePage );
        this.pageContainer.render();
    }

	onPageContainerRender() {
    	console.log( 'onPageContainerRender' );

    	const item = new Item( this.homePage );
    	item.render();
	}

}

const app = new App();

app.initialize();


