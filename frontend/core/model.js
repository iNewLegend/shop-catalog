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

		this.events = {
			onChange: () => {},
		}

		this.initialize();
	}

	initialize() {}

	/**
	 * @returns {ArrayClass}
	 */
	array() {
		const self = this;

		const ArrayClass = class extends Array {
			clear() {
				this.length = 0;
			}

			filter( callbackfn, thisArg, notify = true ) {
				if ( notify ) {
					setTimeout( () => self.events.onChange() );
				}

				return super.filter( callbackfn, thisArg );
			}
		};

		return new ArrayClass();
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'change'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'change':
				return this.events.onChange = callback;

		}

		throw new Error( `event: '${ event }' not found.' `);
	}
}

export default Model;
