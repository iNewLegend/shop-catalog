/**
 * @file: js/api/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import API from './api.js';

const debug = true;

export default class API_Catalog {

    /**
     * Function constructor() Create Catalog Api 
     * 
     * @param {API} api
     */

    constructor(api) {
        if (debug) console.log(`${this.constructor.name}::constructor()`);

        /**@type API */
        this.api = api;

        this.catalog = [];
    }

    /**
     * Function get() : Get catalog from the server
     * 
     * @param {function()} callback 
     * @param {number} page 
     */
    get(callback, page = 0) {
        if (debug) console.log(`${this.constructor.name}::get('${page}')`);

        this.api.get(`catalog/index/${page}`).then(data => {
            if (!data.error) {
                this.catalog = data.result;
            }

            callback(data)
        });
    }

    /**
     * Function getById() : Return product with specific id's
     * 
     * @param {function()} callback 
     * @param {number[]} ids 
     */
    getByIds(callback, ids) {
        if (debug) console.log(`${this.constructor.name}::get('${ids}')`);

        // on empty, fake empty callback.
        if (ids.length <= 0) {
            callback([]);
        } else {
            this.api.get(`catalog/get/${ids}`).then(data => {
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
        if (debug) console.log(`${this.constructor.name}::getLocalProductById('${id}')`);

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