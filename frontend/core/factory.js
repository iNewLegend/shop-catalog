import * as Modules from './index.js'

export class Factory {
	static createElement( selector ) {
		selector = document.querySelector( selector );

		return new Modules.Base( selector.parentElement, selector );
	}

	static createComponent( selector ) {
		selector = document.querySelector( selector );

		return new Modules.Element( selector.parentElement, selector );
	}
}

export default Factory;
