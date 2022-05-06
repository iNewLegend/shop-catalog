/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: component for pagination.
 */
import './pagination.css';

/**
 * @typedef PaginationData pagination data.
 * @property {number} current current page.
 * @property {number} total total amount of items.
 * @property {number} pages amount of pages.
 * @property {number} perPage amount of pages per page.
 * @memberOf components.catalog
 */

export class Pagination extends $flow.modules.Component {
	static getName() {
		return 'Components/Catalog/Pagination';
	}

	constructor( parent, options ) {
		super( parent, options );

		this.logger = new $flow.modules.Logger( Pagination.getName(), true, { sameColor: true } );

		this.logger.startWith( { options } );

		this.page = 0;
		this.events = {};
	}

	template() {
		return () => (
			<div id="pagination" class="pagination hidden">
				<div class="pagination">
					<a onClick="this.onPageChange( (this.page - 1 ) )" class="prev" href="#">&laquo;</a>
					<span class="placeholder"/>
					<a onClick="this.onPageChange( (this.page  + 1 ) )" class="next" href="#">&raquo;</a>
				</div>
			</div>
		);
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			self: this.view.element,
			prev: $flow.Factory.createElement( "#pagination .prev" ),
			next: $flow.Factory.createElement( "#pagination .next" ),
			placeHolder: $flow.Factory.createElement( '#pagination .placeholder' )
		};
	}

	/**
	 * Function onPageChange() : Call on page change.
	 *
	 * @param {number} page
	 */
	onPageChange( page ) {
		const { self, placeHolder } = this.elements;

		this.logger.startWith( { page } );

		// Hide self.
		self.hide();

		// Clear.
		placeHolder.html( '' );
		// Notify events.
		this.events.onPageChange( page );
	}

	/**
	 * Function set() : Set pagination to dom.
	 *
	 * @param {PaginationData} paginationData
	 */
	set( paginationData ) {
		this.logger.startWith( { paginationData } );

		const { placeHolder, next, prev, self } = this.elements;

		if ( this.anchors ) {
			this.anchors.forEach( ( anchor ) => {
				anchor.element.remove();
			} );
		}

		this.anchors = [];

		// Create pages.
		for ( let i = 0; i < paginationData.pages; ++i ) {
			const anchor = new $flow.modules.Element( placeHolder, `<a href="#">${i + 1}</a>` );

			this.anchors.push( anchor );

			anchor.render();
			anchor.click( () => this.onPageChange( i + 1 ) );

			self.show();
		}

		// Set page.
		this.page = paginationData.current + 1;

		// Next.
		if ( paginationData.current >= (paginationData.pages - 1) ) {
			next.hide();
		} else {
			next.show();
		}

		// Prev.
		if ( 1 === this.page ) {
			prev.hide();
		} else {
			prev.show();
		}
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'page:change'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'page:change': {
				this.events.onPageChange = callback;
			}
				break;

			default: {
				throw new Error( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
	}
}

export default Pagination;
