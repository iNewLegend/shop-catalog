/**
 * @file: js/pages/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */

import Modules from 'MODULES';
import Components from 'COMPONENTS/components';
import BaseElement from 'MODULES/document/base-element';

export default class Catalog extends Modules.Page {

    initialize( options ) {
        super.initialize();

        const { api } = options;

        this.logger.name = `Pages.${this.constructor.name}`;
        this.logger.startWith({ api });

        this.catalog = new Components.Catalog( this, '<test></test>', { api } );
    }

    /**
     * Function _onReady() : Called when element ready
     */
    _onReady() {
        this.logger.startEmpty();

        //this.catalog.on('initialRecv', this._onCatalogInitialRecv.bind(this));
        //this.catalog.on('productAdd', this._onCatalogProductAdd.bind(this));

        this.catalog.initialize();
    }

    /**
     * Function _render() : Return the html markup for this page
     */
    render() {
    	super.render();

        const markup = (`
            <div class="home container" style="max-width: 1080px;">
                ${this.catalog._render()}
            </div>
        `), element = new BaseElement( this, markup );


        element.render();

	    this.catalog.render();
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'initialRecv'|'productAdd'} event
     * @param {{function()}} callback
     */
    on(event, callback) {
        this.logger.startWith({ event, callback });

        this.catalog.on(event, callback);
    }
}
