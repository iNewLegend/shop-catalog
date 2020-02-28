/**
 * @file: js/modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import * as core from 'CORE';
import services from 'SERVICES';
import Logger from './logger.js';

export default class Page extends core.Container {
    static getNamespace() {
        return 'Modules'
    }

    static getName() {
        return 'Modules/Page';
    }

    initialize() {
        this.logger = new Logger( Page.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );

        this.logger.startWith( this.constructor.name );

        super.initialize();
    }
}
