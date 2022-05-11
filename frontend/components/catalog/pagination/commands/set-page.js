/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Set pagination according the page.
 */

export class SetPage extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Catalog/Pagination/Commands/Set-Page';
	}

	async apply( { page }, options ) {
		const result = await $flow.managers.data.get( 'Components/Catalog/Data/Index', {
			local: true,
			page: page
		} );

		if ( result.pagination ) {
			$flow.managers.internal.run( 'Components/Catalog/Pagination/Internal/Set', result.pagination );
		}
	}
}
