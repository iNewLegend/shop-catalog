/**
 * @file: core/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Core from "CORE/base/core";

/**
 * @memberOf core
 */
export class Model extends Core {
	get logger() {
		return this._logger;
	}

	set logger( value ) {
		this._logger = value;
	}

	static getNamespace() {
		return 'Core';
	}

	static getName() {
		return 'Core/Model';
	}

	constructor( options = {} ) {
		super();

		this.options = options;

		if ( options.logger ) {
			this._logger = options.logger.clone();
			this._logger.name = this.constructor.getName();

			this._logger.startWith( {  options } );
		}
	}
}

export default Model;
