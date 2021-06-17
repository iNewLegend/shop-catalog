/**
 * @file: core/model/array-class.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import objectHash from "object-hash";
import Model from "CORE/model";

/**
 * @memberOf core.model
 */
export default class ArrayClass extends Array {

	/**
	 * @param {Model} parent
	 */
	constructor( parent ) {
		super();

		Model._idCounter++;

		this._parent = parent;
		this._virtualId = Model._idCounter;
		this._isItemModel = true;
	}

	filter( callbackfn, thisArg ) {
		const getHash = () => objectHash( this?._parent?.getModelData ? this._parent.getModelData() : null ),
			current = getHash();

		const result = super.filter( callbackfn, this.args );

		setTimeout( () => {
			if ( current !== getHash() ) {
				this._parent._events.onChange.forEach( ( event ) => event() );
			}
		} );

		return result;
	}

	clear() {
		this.length = 0;
	}
}
