/**
 * @file: js/modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import Logger from './logger.js';
import Container from 'CORE/container.js';
import Services from 'SERVICES';

export default class Page extends Container {
    initialize() {
        this.logger = new Logger( `Modules.Page`, true );
        this.logger.setOutputHandler( Services.Terminal.onOutput );

        this.logger.startWith( this.constructor.name );

        super.initialize();
    }
}
