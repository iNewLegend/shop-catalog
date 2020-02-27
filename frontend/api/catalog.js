/**
 * @file: js/api/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import { Http } from 'API';

import Modules from 'MODULES';
import Services from 'SERVICES';

export default class Catalog {

    /**
     * Function constructor() Create Catalog Api
     *
     * @param {Http} api
     */

    constructor(http) {
        this.logger = new Modules.Logger('API.' + this.constructor.name, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith({ http });

        this.http = http;

        this.catalog = [];
    }

    /**
     * Function get() : Get catalog from the server
     *
     * @param {{function()}} callback
     * @param {number} page
     */
    get(callback, page = 0) {
        this.logger.startWith({ callback, page });

        this.http.get(`catalog/index/${page}`).then(data => {
            if (!data.error) {
                this.catalog = data.result;
            }

            callback(data)
        });
    }

    /**
     * Function getById() : Return product with specific id's
     *
     * @param {{function()}} callback
     * @param {number[]} ids
     */
    getByIds(callback, ids) {
        this.logger.startWith({ callback, ids });

        // on empty, fake empty callback.
        if (ids.length <= 0) {
            callback([]);
        } else {
            this.http.get(`catalog/get/${ids}`).then(data => {
                callback(data)
            });
        }
    }

    /**
     * Function getLocalProductById() : Get product from local catalog
     *
     * @param {number} id
     * @return {{}|null}
     */
    getLocalProductById(id) {
        this.logger.startWith({ id });

        for (let i in this.catalog) {
            if (this.catalog[i].id == id) {
                let tmp = {};
                // return copy since this, catalog may be not writeable.
                Object.assign(tmp, this.catalog[i]);

                return tmp;
            }
        }

        return null;
    }
}
