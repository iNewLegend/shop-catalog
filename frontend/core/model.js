/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Model, which contains all data for each component, it should automatically detects changes within the model.
 */
import Core from 'CORE/base/core';
import Logger from './modules/logger';
import ArrayClass from "./model/array-class";
import ObjectHash from "object-hash";

/**
 * Function refresh().
 *
 * Get current model state, and compare it with the previous state.
 * If changes detected, then tell the model about it own changes.
 *
 * @param {Model} model
 */
export const refresh = ( model ) => {
	const data = model.getModelData();

	if ( ! data ) {
		return;
	}

	const dataHash = ObjectHash( data );

	if ( dataHash === model._prevModelHash ) {
		return;
	}

	model._events?.onChange.forEach( ( event ) => event( {
		modelOnChange: data.virtualId,
		prevModel: model._prevModel,
		currentModel: data,
	} ) );

	model._prevModel = Object.assign( data );
	model._prevModelHash = dataHash;
}

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

	static getName() {
		return 'Core/Model';
	}

	_cache = {};
	_cacheHash = {};
	_prevModel = {};
	_prevModelHash = {};

	_events = {
        onChange: [],
    };

	constructor( options = {} ) {
		super();

		this._options = options;

		this._logger = new Logger( this.getName(), true, { sameColor: true } );
		this._logger.startWith( { options } );``

		this.initialize();

		const self = this;

		let timeout;

		return new Proxy( this, {
			set: function( target, key, value ) {
				target[ key ] = value;

				if ( ! key.startsWith( '_' ) ) {
					if ( timeout ) {
						clearTimeout( timeout );
					}

					const cacheExist = self._cache[ key ];

					self._cache[ key ] = value;

					if ( value instanceof Object ) {
						let dataHash;

						try {
							self._cacheHash[ key ] = ObjectHash( value );
						} catch ( e ) {
						}

						setTimeout( () => refresh( self ) );
						return true;
					} else if ( value !== -1 && value !== '-1'&& cacheExist !== undefined && cacheExist !== value ) {
						timeout = setTimeout( () => refresh( self ) );

						return true;
					}
				}

				return true;
			}
		} );
	}

	initialize() {
		refresh( this );
	}

	getModelData() {
		const result = {},
			propertyNames = Object.getOwnPropertyNames( this );

		propertyNames.forEach( ( property ) => {
			if ( 'string' === typeof property && property.startsWith( '_' ) ) {
				return;
			}

			const prop = this[ property ];

			if ( prop instanceof ArrayClass ) {
				// If its array of components.
				if ( prop.some( ( instance ) => instance instanceof $core.Component ) ) {
					result[ property ] = prop.map( ( prop ) => prop.model.getModelData() );
					return;
				}

				if ( ! prop.length ) {
					return;
				}
			}

			result[ property ] = prop;
		} );

		return result;
	}

	destroy() {
		Object.getOwnPropertyNames( this ).forEach( ( key ) => {
			if ( this[ key ]?._isCollectionModel ) {
				this[ key ].forEach( ( item ) => {
					item.model.destroy();
				} );
			}
		} )
	}

	/**
	 * @returns {[]}
	 */
	array() {
		return new ArrayClass( this );
	}

	/**
	 * @returns String
	 */
	string() {
		return String( -1 );
	}

	/**
	 * @returns Number
	 */
	number() {
		return Number( -1 )
	}

	/**
	 * @returns boolean
	 */
	boolean() {
		return Boolean( false )
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
				return this._events.onChange.push( callback );
		}

		throw new Error( `event: '${ event }' not found.' `);
	}
}

export default Model;
