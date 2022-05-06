/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get the catalog from the server and cache it.
 */

export class Index extends $flow.commandBases.CommandData {
	static localCatalog = [];

	static getName() {
		return 'Components/Catalog/Data/Index';
	}

	getEndpoint() {
		return 'catalog/index/{page}';
	}

	apply( args, options ) {
		const { query } = args;

		if ( options.local && this.constructor.localCatalog.length ) {
			if ( query.id ) {
				return this.constructor.localCatalog.find( ( item ) => item.id == query.id );
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

export { Get } from './get';
