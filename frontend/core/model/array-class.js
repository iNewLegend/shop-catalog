/**
 * @file: core/model/array-class.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import Model from "CORE/model";

/**
 * @memberOf core.model
 */
export default class ArrayClass extends Array {

	/**
	 * @param {Model} parent
	 */
	constructor( parent, value = null ) {
		super();

		if ( value ) {
			Array.prototype.push.apply( this, value );
		}

		Model._idCounter++;

		this._virtualId = Model._idCounter;
		this._isItemModel = true;

		if ( parent instanceof $core.Model ) {
			this._parent = parent;
		}
	}

	filter( callback ) {
		// Determine remove or insert and call 'onchange:array:insert' 'onchange:array:remove'
		const beforeLen = this.length,
			result = super.filter( callback ),
			afterLen = result.length;

		setTimeout( () => {
			const onChangeCallbacks = () => this._parent._events.onChange.forEach( ( event ) => event() );

			if ( beforeLen !== afterLen ) {
				onChangeCallbacks();
			}
		} );

		return new ArrayClass( this._parent, result );
	}

	push( ...items ) {
		// TODO: Add silence.
		const result = super.push( ... items );

		// onchange:array:insert
		this._parent._events.onChange.forEach( ( event ) => event() );

		return result;
	}

	clear() {
		this.length = 0;
	}
}
