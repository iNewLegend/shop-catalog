/**
 * @file: js/modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import Modules from '../modules/modules.js';
import Components from '../components/components.js';
import API from '../api/api.js';

export default class Catalog extends Modules.Page {

    initialize( options ) {
        super.initialize();
        
        const { api } = options;

        this.logger.name = `Pages.${this.constructor.name}`;
        this.logger.startWith({ api });

        this.catalog = new Components.Catalog(api);

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
    _render() {
        return (`
            <div class="home container" style="max-width: 1080px;">
                ${this.catalog.render()}
            </div>
        `);
    }

    /**
     * Function on() : Delcare event callback
     * 
     * @param {'initialRecv'|'productAdd'} event 
     * @param {{function()}} callback 
     */
    on(event, callback) {
        this.logger.startWith({ event, callback });

        this.catalog.on(event, callback);
    }
}