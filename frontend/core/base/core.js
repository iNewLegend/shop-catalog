/**
 * @file: core/base/core.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class/object for all instances, responsible for 'getNamespace', 'getName', implementation.
 */
import { ForceMethodBase } from '../errors/force-method';

/**
 * @memberOf core
 */
export class Core {
	static _idCounter = 0;

	constructor() {
		this.virtualId = Core._idCounter;

		++Core._idCounter;
	}

	static getName() {
		throw new ForceMethodBase( 'Core/Base/Core', 'getName' );
	}

	getNamespace() {
		return this.constructor.getNamespace();
	}

	getName() {
		return this.constructor.getName();
	}

}

export default Core;
