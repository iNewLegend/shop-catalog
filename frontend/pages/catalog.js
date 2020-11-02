/**
 * @file: pages/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */
import { Page } from 'MODULES';
import * as components from 'COMPONENTS';

/**
 * @memberOf pages
 */
export class Catalog extends Page {
    static getNamespace() {
        return 'Pages'
    }

    static getName() {
        return 'Pages/Catalog';
    }

    initialize( options ) {
        super.initialize( options );

        const { api } = options;

        this.api = api;

        this.logger.name = Catalog.getName();
        this.logger.startWith( { api } );

        this.catalog = new components.Catalog( this, {
            api: this.api,
        } );
    }

    afterRender() {
        super.afterRender();

        this.catalog.render();
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'product:add','recv:once'|} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        this.catalog.on( event, callback );
    }
}

export default Catalog;
