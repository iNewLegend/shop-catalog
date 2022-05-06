/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class/object for all instances, responsible for: 'getName', implementation.
 */
import { ForceMethodBase } from '../errors/force-method';

export class Core {
	static idCounter = 0;

	static getName() {
		throw new ForceMethodBase( 'Core/Base/Core', 'getName' );
	}

	constructor() {
		this.virtualId = Core.idCounter;

		++Core.idCounter;
	}

	getName() {
		return this.constructor.getName();
	}
}

export default Core;
