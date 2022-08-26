/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */
import { Terminal } from '../services/';
import { getContainer } from "@appflux/mvc";

/* global $flow */

/**
 * @memberOf modules
 */
export class Page extends getContainer() {
	static getName() {
		return 'Modules/Page';
	}

	initialize() {
		this.logger = new $flow.modules.Logger( Page.getName(), true );
		this.logger.setOutputHandler( Terminal.onOutput );

		this.logger.startWith( { parentName: this.constructor.getName() } );

		super.initialize();
	}
}

export default Page;
