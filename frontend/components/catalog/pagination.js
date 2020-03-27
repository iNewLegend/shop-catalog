/**
 * @file: components/pagination.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages pages
 */

import * as core from 'CORE';
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
                prev: core.Factory.createElement( "#pagination .prev" ),
                next: core.Factory.createElement( "#pagination .next" ),
                placeHolder: core.Factory.createElement( '#pagination .placeholder' )
            };
        }
    }

    static getNamespace() {
        return 'Components/Catalog'
    }

    static getName() {
        return 'Components/Catalog/Pagination';
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
        placeHolder.html('');

        // Notify events.
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

        // Create pages.
        for ( let i = 0; i < paginationResult.pages; ++i ) {
            //const anchor = $( `<a href="#">${i + 1}</a>` );
            const anchor = new core.Element( placeHolder, `<a href="#">${i + 1}</a>` );

            anchor.render();
            anchor.click( () => this.onPageChange( i + 1 ) );

            self.show();
        }

        // Set page.
        this.page = paginationResult.current + 1;

        // Next.
        if ( paginationResult.current >= (paginationResult.pages - 1) ) {
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

    template() {
        const markup = (`
            <div id="pagination" class="pagination hidden">
                <div class="pagination">
                    <a onclick="this.onPageChange( (this.page - 1 ) )" class="prev" href="#">&laquo;</a>
                    <span class="placeholder">
                    </span>
                    <a onclick="this.onPageChange( (this.page  + 1 ) )" class="next" href="#">&raquo;</a>
                </div>
            </div>
        `);

        return markup;
    }
}

export default Pagination;
