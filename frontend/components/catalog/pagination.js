/**
 * @file: components/pagination.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: component for pagination.
 */
import * as services from 'SERVICES';
import { Logger } from 'MODULES';

import './pagination.css';

/**
 * @typedef PaginationData pagination data.
 * @property {number} current current page.
 * @property {number} total total amount of items.
 * @property {number} pages amount of pages.
 * @property {number} perPage amount of pages per page.
 * @memberOf components
 */

/**
 * @memberOf components
 */
export class Pagination extends $core.Component {
	constructor( parent, options ) {
		super( parent, options );

		this.logger = new Logger( Pagination.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startWith( { options } );

        this.page = 0;

        this.events = {
            onPageChange: ( page ) => {},
        };
    }

	static getNamespace() {
		return 'Components/Catalog'
	}

	static getName() {
		return 'Components/Catalog/Pagination';
	}

	template() {
		return (`
			<div id="pagination" class="pagination hidden">
				<div class="pagination">
					<a onclick="this.onPageChange( (this.page - 1 ) )" class="prev" href="#">&laquo;</a>
					<span class="placeholder"></span>
					<a onclick="this.onPageChange( (this.page  + 1 ) )" class="next" href="#">&raquo;</a>
				</div>
			</div>
        `);
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			self: this.view.element,
			prev: $core.Factory.createElement( "#pagination .prev" ),
			next: $core.Factory.createElement( "#pagination .next" ),
			placeHolder: $core.Factory.createElement( '#pagination .placeholder' )
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

		// Create pages.
		for ( let i = 0; i < paginationData.pages; ++i ) {
			const anchor = new $core.Element( placeHolder, `<a href="#">${i + 1}</a>` );

			anchor.render();
			anchor.click( () => this.onPageChange( i + 1 ) );

			self.show();
		}

		// Set page.
        this.page = paginationData.current + 1;

        // Next.
        if ( paginationData.current >= ( paginationData.pages - 1 ) ) {
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
				alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
	}
}

export default Pagination;
