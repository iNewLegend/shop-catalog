import * as core from '../../frontend/core/index.js';
import * as modules from '../../frontend/modules/index.js';

class PageContainer extends core.Container {

}

class Page extends core.Container {

}

class CatalogPage extends Page {
    onClick = () => {
        alert( 'page home');
    };
}


class Component extends modules.Component {
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

        this.app = new core.Element(this.elements.root, `<div class="app">App</div>`);

        this.pageContainer = new PageContainer( this.app, '<div class="page">Page Container</div>' );

        this.pageContainer.on('render:after', this.onPageContainerRender.bind( this ) );

        this.homePage = new CatalogPage( this.pageContainer, '<div class="homepage">Home Page</div>')

        this.app.render();

	    this.pageContainer.set( this.homePage );
        this.pageContainer.render();
    }

	onPageContainerRender() {
    	console.log( 'onPageContainerRender' );

    	const component = new Component( this.homePage );
    	component.render();
	}

}

const app = new App();

app.initialize();


