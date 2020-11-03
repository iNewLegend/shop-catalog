/**
 * @file: api/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
import * as services from 'SERVICES';
import * as modules from 'MODULES';

/**
 * @memberOf API
 */
export class Catalog {

	static getNamespace() {
		return 'API'
	}

	static getName() {
		return 'API/Catalog';
	}

	/**
	 * Function constructor() Create Catalog Api
	 *
	 * @param {API.Http} http
	 */
	constructor( http ) {
		this.logger = new modules.Logger( Catalog.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startWith( { http } );

		this.http = http;

		this.catalog = [];
	}

	/**
	 * Function get() : Get catalog from the server
	 *
	 * @param {{function()}} callback
	 * @param {number} page
	 */
	get( callback, page = 0 ) {
		this.logger.startWith( { callback, page } );

		this.http.get( `catalog/index/${page}` ).then( data => {
			if ( ! data.error ) {
				this.catalog = data.result;
			}

			callback( data )
		} );
	}

	/**
	 * Function getById() : Return product with specific id's
	 *
	 * @param {{function()}} callback
	 * @param {number[]} ids
	 */
	getByIds( callback, ids ) {
		this.logger.startWith( { callback, ids } );

		// On empty, fake empty callback.
		if ( ids.length <= 0 ) {
			callback( [] );
		} else {
			this.http.get( `catalog/get/${ids}` ).then( data => {
				callback( data )
			} );
		}
	}

	/**
	 * Function getLocalProductById() : Get product from local catalog
	 *
	 * @param {number} id
	 * @return {{}|null}
	 */
	getLocalProductById( id ) {
		this.logger.startWith( { id } );

		let result = null;

		this.catalog.some( ( item ) => {
			if ( parseInt( item.id ) === id ) {
				// Return copy since this, catalog may be not writeable.
				result = Object.assign( {}, item );
			}
		} );

		return result;
	}
}

export default Catalog;
