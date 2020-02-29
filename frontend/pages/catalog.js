/**
 * @file: pages/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */
import modules from 'MODULES';
import components from 'COMPONENTS';

export default class Catalog extends modules.Page {
    static getNamespace() {
        return 'Pages'
    }

    static getName() {
        return 'Pages/Catalog';
    }

    initialize( options ) {
        super.initialize( options );

        const { api } = options;

        this.logger.name = Catalog.getName();
        this.logger.startWith( { api } );

        this.catalog = new components.Catalog( this, {
            api
        } );
    }

    afterRender() {
        super.afterRender();

        this.catalog.render();
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'initialRecv'|'productAdd'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        this.catalog.on( event, callback );
    }
}
