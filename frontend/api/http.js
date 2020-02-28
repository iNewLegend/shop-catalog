/**
 * @file: js/api/http.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: instead of using jquery ajax, i choose this.
 */

import Modules from 'MODULES';
import Services from 'SERVICES';

export default class Http {
    /**
     * Function constructor() : Create API
     *
     * @param {string} apiBaseUrl
     */
    constructor( apiBaseUrl = 'http://localhost' ) {
        this.logger = new Modules.Logger( 'API.' + this.constructor.name, true );
        this.logger.setOutputHandler( Services.Terminal.onOutput );

        this.logger.startWith( { apiBaseUrl } );

        this.apiBaseUrl = apiBaseUrl;
    }

    static getNamespace() {
        return 'API'
    }

    static getName() {
        return 'API/Http';
    }

    /**
     * Function fetch() : fetch api
     *
     * @param {string} path
     * @param {string} method
     * @param {{}} body
     *
     * @return {*}
     */
    async _fetch( path, method, body = null ) {
        this.logger.startWith( { path, method, body } );

        const params = { 'credentials': 'include' }; // cookies

        const headers = {};

        if ( method === 'post' ) {
            Object.assign( headers, { 'Content-Type': 'application/json' } );
            Object.assign( params, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify( body )
            } );

        } else {
            Object.assign( params, { headers } );
        }

        // since i made it async function
        const response = await fetch( this.apiBaseUrl + path, params );
        let data = undefined;

        try {
            data = await response.json();
        } catch ( e ) {
            console.error( e );

            return false;
        }

        this.logger.recv( { path }, data );

        if ( data.error ) {
            data.message = this.translateError( data.message );

            if ( data.global ) {
                throw data.message;
            }
        }

        return data;
    }

    /**
     * Function translateError() : Used to translate server error.
     *
     * TODO Function should be exported to api.js
     *
     * @param {({}|string)} message
     *
     * @return {string}
     */
    translateError( message ) {
        this.logger.startWith( { message } );

        if ( typeof message == 'object' ) {
            message = message.map( element => {
                return this.translateError( element );
            } );
        }

        switch ( message ) {
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
     * @return {*}
     */
    get( path ) {
        this.logger.startWith( { path } );

        return this._fetch( path, 'get' );
    }

    /**
     * Function post() : Send post request
     *
     * @param {string} path
     * @param {{}} params
     *
     * @return {*}
     */
    post( path, params ) {
        this.logger.startWith( { path, params } );

        return this._fetch( path, 'post', params );
    }
}
