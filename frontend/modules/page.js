/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */
import { Terminal } from '../services/';
import $flow from '@appsflow/core';
import $mvc from '@appsflow/mvc';

export class Page extends $mvc.Container {
	static getName() {
		return 'Modules/Page';
	}

	initialize() {
		this.logger = new ($flow.modules()).Logger( Page.getName(), true );
		this.logger.setOutputHandler( Terminal.onOutput );

		this.logger.startWith( { parentName: this.constructor.getName() } );

		super.initialize();
	}
}

export default Page;
