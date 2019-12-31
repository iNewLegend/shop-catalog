import * as Modules from './index.js'

export class Factory {
	static createElement( selector ) {
		selector = document.querySelector( selector );

		return new Modules.BaseElement( selector.parentElement, selector );
	}

	static createComponent( selector ) {
		selector = document.querySelector( selector );

		return new Modules.Component( selector.parentElement, selector );
	}
}

export default Factory;
