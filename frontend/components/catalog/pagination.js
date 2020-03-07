/**
 * @file: components/pagination.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages pages
 */

import * as services from 'SERVICES';
import {
    Component,
    Logger,
} from 'MODULES';

/**
 * @memberOf components
 */
export class Pagination extends Component {
    constructor( parent, options ) {
        super( parent, options );

        this.logger = new Logger( Pagination.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );

        this.logger.startWith( { options } );

        this.page = 0;

        this.events = {
            onPageChange: ( page ) => {},
        };

        this.afterRender = () => {
            super.afterRender();

            this.elements = {
                self: this.view.element,
                prev: $( "#pagination .prev" ),
                next: $( "#pagination .next" ),
                placeHolder: $( '#pagination .placeholder' )
            };

	        this.elements.next.click( () => this.onPageChange( (this.page + 1) ) );
	        this.elements.prev.click( () => this.onPageChange( (this.page - 1) ) );
        }
    }

    static getNamespace() {
        return 'Components/Catalog'
    }

    static getName() {
        return 'Components/Catalog/Pagination';
    }

    onPageChange( page ) {
        const { self, placeHolder } = this.elements;

        this.logger.startWith( { page } );

        self.hide();
        placeHolder.empty();

        this.events.onPageChange( page );
    }

    /**
     * Function set() : Set pagination to dom.
     *
     * @param {{}} paginationResult
     */
    set( paginationResult ) {
        this.logger.startWith( { paginationResult } );

        const { placeHolder, next, prev, self } = this.elements;

        // pages
        for ( let i = 0; i < paginationResult.pages; ++i ) {
            const anchor = $( `<a href="#">${i + 1}</a>` );

            anchor.click( function( val ) {
                this.onPageChange( val );
            }.bind( this, parseInt( anchor.html() ) ) );

            placeHolder.append( anchor );

            self.show();
        }

        // set page
        this.page = paginationResult.current + 1;

        // next
        if ( paginationResult.current >= (paginationResult.pages - 1) ) {
            next.hide();
        } else {
            next.show();
        }

        // prev
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

    template() {
        const markup = (`
            <div id="pagination" class="pagination hidden">
                <div class="pagination">
                    <a class="prev" href="#">&laquo;</a>
                    <span class="placeholder">
                    </span>
                    <a class="next" href="#">&raquo;</a>
                </div>
            </div>
        `);

        return markup;
    }
}

export default Pagination;
