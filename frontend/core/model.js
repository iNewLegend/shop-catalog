/**
 * @file: core/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import objectHash from "object-hash";
import Core from 'CORE/base/core';
import Logger from './modules/logger';
import ArrayClass from "./model/array-class";

/**
 * @memberOf core
 */
export class Model extends Core {
	static LOCAL_WORKER_INTERVAL_TIMEOUT = 100;

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

	static models = {};

	constructor( options = {} ) {
		super();

		this._options = options;

		this._logger = new Logger( this.getName(), true, { sameColor: true } );
		this._logger.startWith( { options } );

		this._events = {
			onChange: [],
		}

		this._alive = true;

		this.initialize();
	}

	initialize() {
		this.initializeModelChangeDetectionWorker()
		// setTimeout ( () => this.initializeModelChangeDetectionLocal() );
	}

	// TODO: ModelChangeDetection should work like a garbage collector, to detect the changes that were missed/too deep/complex.

	initializeModelChangeDetectionLocal() {
		const interval = setInterval( () => {
			if ( ! this._alive ) {
				return clearInterval( interval );
			}

			const snapshot = objectHash( this.getModelData() );

			if ( this._currentSnapshot && snapshot !== this._currentSnapshot ) {
				setTimeout( () => this._events.onChange.forEach( ( event ) => event() ) );
			}

			this._currentSnapshot = snapshot;
		},
		200
		);

		this._currentSnapshot = objectHash( this.getModelData() );
	}

	initializeModelChangeDetectionWorker() {
		if ( ! Model.worker ) {
			Model.worker = new Worker( new URL( './model/worker', import.meta.url ) );
			Model.worker.addEventListener( "message", ( e ) => {
				if ( e.data.modelOnChange ) {
					const model = Model.models[ e.data.modelOnChange ];

					if ( model ) {
						model._events?.onChange.forEach( ( event ) => event( e.data ) );
					}
				}
			} );
		}

		// Local send data worker.
		const updateDataLoop = () => {
			// Repeat.
			if ( Model.worker ) {
				if ( ! this._alive ) {
					const model = Model.models[ this.virtualId ];

					delete Model.models[ this.virtualId ];

					if ( model ) {
						// Tell the worker to delete model.
						Model.worker.postMessage( {
							delete: this.virtualId,
						} );

					}

					return clearInterval( this._localWorkerInternval );
				}

				const currentModelData = this.getModelData();

				if ( ! Object.keys( currentModelData ).length ) {
					return;
				}

				// Update global models with current changes.
				Model.models[ this.virtualId ] = this;

				if ( ! currentModelData.virtualId ) {
					throw new Error( 'virtualId is required' );
				}

				if ( 1 === Object.keys( currentModelData ).length ) {
					// Only virtual id.
					return;
				}

				// Tell the worker to set model.
				Model.worker.postMessage( {
					set: currentModelData,
				} );

				// Repeat till alive.
				if ( ! this._alive ) {
					delete Model.models[ currentModelData.virtualId ];

					// Tell the worker to delete model.
					Model.worker.postMessage( {
						delete: currentModelData.virtualId,
					} );

					return clearInterval( this._localWorkerInternval );
				}
			}
		}

		this._localWorkerInternval = setInterval( updateDataLoop.bind( this ), Model.LOCAL_WORKER_INTERVAL_TIMEOUT );
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

		this._alive = false;
	}

	/**
	 * @returns {ArrayClass}
	 */
	array() {
		return new ArrayClass( this );
	}

	/**
	 * @returns String
	 */
	string() {
		return String();
	}

	/**
	 * @returns Number
	 */
	number() {
		return Number()
	}

	/**
	 * @returns boolean
	 */
	boolean() {
		return Boolean();
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
