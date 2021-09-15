/**
 * @file: core/factory.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import * as modules from './index.js'

/**
 * @memberOf core
 */
export class Factory {

	static getName() {
		return 'Core/Factory';
	}

	/**
	 * @returns {core.Element}
	 */
	static createElement( selector ) {
		selector = document.querySelector( selector );

		return new modules.Element( selector.parentElement, selector );
	}
}

export default Factory;
