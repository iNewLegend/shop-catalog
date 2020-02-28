import * as modules from './index.js'

export class Factory {
    static getNamespace() {
        return 'Core'
    }

    static getName() {
        return 'Core/Factory';
    }

	static createElement( selector ) {
		selector = document.querySelector( selector );

		return new modules.Element( selector.parentElement, selector );
	}
}

export default Factory;
