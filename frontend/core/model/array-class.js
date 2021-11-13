/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: TODO.
 */
import { Model, refresh as modelRefresh } from "CORE/model";
import { Component } from "CORE/index";

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

		Model.idCounter++;

		this._virtualId = Model.idCounter;
		this._isCollectionModel = true;

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
			const onChangeCallbacks = () => this._parent._events.onChange.forEach( ( event ) => event( {} ) );

			if ( beforeLen !== afterLen ) {
				onChangeCallbacks();

				modelRefresh( this._parent );
			}
		} );

		return new ArrayClass( this._parent, result );
	}

	push( ...items ) {
		// TODO: Add silence.
		const result = super.push( ... items );

		modelRefresh( this._parent );

		return result;
	}

	pushSilent( item ) {
		return  super.push( item );
	}

	clear() {
		if ( this.length ) {
			Object.values( this ).forEach( ( prop ) => {
				if ( prop instanceof Component ) {
					prop.remove();
				}
			} );

			modelRefresh( this._parent );
		}

		this.length = 0;
	}
}
