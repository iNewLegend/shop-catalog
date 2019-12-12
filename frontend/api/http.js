/**
 * @file: js/api/http.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: inseatd of using jquery ajax, i choosed this.
 */

import Modules from 'MODULES';
import Services from '../services/services.js';

export default class Http {
    /**
     * Function constructor() : Create API
     *
     * @param {string} apiBaseUrl
     */
    constructor(apiBaseUrl = 'http://localhost:8080/api/?cmd=') {
        this.logger = new Modules.Logger('API.' + this.constructor.name, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith({apiBaseUrl});

        this.apiBaseUrl = apiBaseUrl;
    }

    /**
     * Function fetch() : fetch api
     *
     * @param {string} path
     * @param {string} method
     * @param {{}} body
     *
     * @return {any}
     */
    async _fetch(path, method, body = null) {
        this.logger.startWith({ path, method, body });

        const params = { 'credentials': 'include' }; // cookies

        const headers = {}

        if (method === 'post') {
            Object.assign(headers, { 'Content-Type': 'application/json' });
            Object.assign(params, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

        } else {
            Object.assign(params, { headers });
        }

        // since i made it async function
        const response = await fetch(this.apiBaseUrl + path, params);
        try {
	        const data = await response.json();
        } catch ( e ) {
        	console.error( e );

        	return false;
        }

        this.logger.recv({ path }, data);

        if (data.error)  {
            data.message = this.translateError(data.message);

            if (data.global) {
                throw data.message;
            }
        }

        return data;
    }

    /**
     * Function translateError() : Used to translate server error.
     *
     * @todo Function should be exported to api.js
     *
     * @param {({}|string)} message
     *
     * @return {string}
     */
    translateError(message) {
        this.logger.startWith({ message });

        if (typeof message == 'object') {
            message = message.map(element => {
                return this.translateError(element);
            });
        }

        switch (message) {
            case 'system_error':
                return 'system error. please contact the system administrator';
        }

        return message;
    }

    /**
     * Function get() : Send get request
     *
     * @param {string} path
     *
     * @return {any}
     */
    get(path) {
        this.logger.startWith({ path });

        return this._fetch(path, 'get');
    }

    /**
     * Funciton post() : Send post request
     *
     * @param {string} path
     * @param {{}} params
     *
     * @return {any}
     */
    post(path, params) {
        this.logger.startWith({ path, params });

        return this._fetch(path, 'post', params);
    }
}
