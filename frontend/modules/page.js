/**
 * @file: modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */
import { Container } from 'CORE';
import * as services from 'SERVICES';

/**
 * @memberOf modules
 */
export class Page extends Container {

	static getName() {
		return 'Modules/Page';
	}

	initialize() {
		this.logger = new $core.modules.Logger( Page.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startWith( this.constructor.name );

		super.initialize();
	}
}

export default Page;
