/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import { Element } from "./modules";

export class Factory {
	static getName() {
		return 'Core/Factory';
	}

	/**
	 * @returns {$flow.modules.Element|false}
	 */
	static createElement( selector ) {
		selector = document.querySelector( selector );

		if ( ! selector?.parentElement ) {
			return false;
		}

		return new Element( selector.parentElement, selector );
	}
}

export default Factory;
