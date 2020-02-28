/**
 * @file: js/api/websocket.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

import Modules from 'MODULES';
import Services from 'SERVICES';

/**
 * @typedef {"open" | "message" | "close" | "error"} API_Websocket_Events
 */

export default class Websocket {
    constructor( address, port, autoInit = false ) {
        this.logger = new Modules.Logger( Websocket.getName(), true );
        this.logger.setOutputHandler( Services.Terminal.onOutput );

        this.logger.startWith( { address, port, autoInit } );

        this.binds = [];

        this.webSocket = null;
        this.connectionString = `ws://${address}:${port}/`;

        this.logger.debug( `connection string: '${this.connectionString}'` );

        if ( autoInit ) this.initialize();
    }

    static getNamespace() {
        return 'API'
    }

    static getName() {
        return 'API/Websocket';
    }

    initialize() {
        this.logger.startEmpty();

        this.webSocket = new WebSocket( this.connectionString );

        this.webSocket.onopen = ( e ) => this._onOpen( e );
        this.webSocket.onmessage = ( e ) => this._onMessage( e );
        this.webSocket.onclose = ( e ) => this._onClose( e );
        this.webSocket.onerror = ( e ) => this._onError( e );
    }

    _onOpen( e ) {
        this.logger.startWith( { e } );

        const bind = this.binds.find( ( bind ) => bind.type === 'open' );

        if ( bind ) {
            bind.callback( e );
        }
    }

    _onMessage( e ) {
        this.logger.startWith( { e } );

        const bind = this.binds.find( ( bind ) => bind.type === 'message' );

        if ( bind ) {
            bind.callback( e );
        }
    }

    _onClose( e ) {
        this.logger.startWith( { e } );

        const bind = this.binds.find( ( bind ) => bind.type === 'close' );

        if ( bind ) {
            bind.callback( e );
        }
    }

    _onError( e ) {
        this.logger.startWith( { e } );

        const bind = this.binds.find( ( bind ) => bind.type === 'error' );

        if ( bind ) {
            bind.callback( e );
        }
    }

    /**
     * @param {API_Websocket_Events} type
     */
    bind( id, type, callback ) {
        this.logger.startWith( { id, type, callback } );

        switch ( type ) {
            case 'open':
            case 'message':
            case 'close':
            case 'error':
                break;
            // ----
            default:
                throw (`unknown type: '${type}'`);
        }

        this.binds.push( { id, type, callback } );
    }

    unbind( id ) {
        this.logger.startWith( { id } );

        let index = list.map( x => {
            return x.id;
        } ).indexOf( id );

        this.binds.splice( index, 1 );
    }

    send( data ) {
        this.logger.startWith( { data } );

        this.webSocket.send( data );
    }

    close() {
        this.logger.startWith();

        this.webSocket.close();
    }
}
