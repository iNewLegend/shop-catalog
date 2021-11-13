/**
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
	 * @returns {core.Element|false}
	 */
	static createElement( selector ) {
		selector = document.querySelector( selector );

		if ( ! selector?.parentElement ) {
			return false;
		}

		return new modules.Element( selector.parentElement, selector );
	}
}

export default Factory;
