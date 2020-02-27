import * as Core from '../../frontend/core/index.js';
import Modules from '../../frontend/modules/index.js';

class PageContainer extends Core.Container {

}

class Page extends Core.Container {

}

class CatalogPage extends Page {
    onClick = () => {
        alert( 'page home');
    };
}


class Item extends Modules.Component {
	template() {
		return '' +
			'<div class"item">' +
				'<h1 onClick="this.onItemClick()">Item</h1>' +
                '<input type="text" onchange="this.onInputChanged( event )">' +
			'</div'
		;
	}

	onInputChanged( event ) { // controller
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

        this.app = new Core.Element(this.elements.root, `<div class="app">App</div>`);

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


