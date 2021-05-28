/**
 * @file: components/catalog/data/index.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get the catalog from the server and cache it.
 */

/**
 * @memberOf components.catalog.data
 */
export class Index extends $core.data.Command {
	static localCatalog = [];

	static getNamespace() {
		return 'Components/Catalog/Data'
	}

	static getName() {
		return 'Components/Catalog/Data/Index';
	}

	getEndpoint() {
		return 'catalog/index/{page}';
	}

	apply( args, options ) {
		const { query } = args;

		if ( options.local ) {
			if ( query.id ) {
				return this.constructor.localCatalog[ query.id ];
			}

			return this.constructor.localCatalog;
		}

		const result = super.apply( args, options );

		if ( result.then ) {
			result.then( ( result ) => {
				this.constructor.localCatalog = result.result;
			} );
		}

		return result;
	}
}