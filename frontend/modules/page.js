/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */
import { Terminal } from '../services/';
import { Container } from '../app-flow/modules/elements/';

/**
 * @memberOf modules
 */
export class Page extends Container {
	static getName() {
		return 'Modules/Page';
	}

	initialize() {
		this.logger = new $flow.modules.Logger( Page.getName(), true );
		this.logger.setOutputHandler( Terminal.onOutput );

		this.logger.startWith( this.constructor.name );

		super.initialize();
	}
}

export default Page;
