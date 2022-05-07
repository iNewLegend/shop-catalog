/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import { Element } from "./element";

export class Factory {
	static getName() {
		return 'Flow/Factory';
	}

	/**
	 * @returns {$flow.Element|false}
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
