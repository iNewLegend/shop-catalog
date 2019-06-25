/**
 * @file: js/app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import API from './api/api.js';
import Catalog from './catalog.js';

class App {
    constructor() {
        const remoteAdress = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/api/?cmd='

        this.catalog = new Catalog(new API(remoteAdress));
    }

    initialize() {
        if (this.debug) console.log(`${this.constructor.name}::initialize()`);

        this.catalog.initialize();
    }
}

// EnteryPoint.

const app = new App();
app.initialize();