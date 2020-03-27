/**
 * @file: components/pagination.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages pages
 */

import * as services from 'SERVICES';
import { Component, Logger } from 'MODULES';
import './spinner.css';

/**
 * @memberOf components
 */
export class Spinner extends Component {
    constructor( parent, options ) {
        super( parent, options );

        this.logger = new Logger( Spinner.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );
        this.logger.startWith( { options } );
    }

    static getNamespace() {
        return 'Components/Catalog'
    }

    static getName() {
        return 'Components/Catalog/Spinner';
    }

    fadeOut( ms, callback ) {
        setTimeout( () => {
            this.view.element.hide();

            callback();
        }, ms );
    }

    template() {
        return '<div class="spinner" style="border-top-color: lightskyblue"></div>';
    }
}

export default Spinner;
