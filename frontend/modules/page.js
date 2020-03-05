/**
 * @file: modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */
import { Container }  from 'CORE';
import * as modules from 'MODULES';
import * as services from 'SERVICES';

/**
 * @memberOf modules
 */
export class Page extends Container {
    static getNamespace() {
        return 'Modules'
    }

    static getName() {
        return 'Modules/Page';
    }

    initialize() {
        this.logger = new modules.Logger( Page.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );

        this.logger.startWith( this.constructor.name );

        super.initialize();
    }
}

export default Page;
