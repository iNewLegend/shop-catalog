/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import * as commands from "./commands/";
import * as data from "./data/";
import * as internal from "./internal/";

export class Controller extends $flow.Controller {
	static getName() {
		return 'Components/Cart/Controller';
	}

	getCommands() {
		return commands;
	}

	getData() {
		return data;
	}

	getInternal() {
		return internal;
	}

	setupHooks() {
		$flow.commands.onAfterAffect(
			'Components/Cart/Item/Commands/Remove',
			'Components/Cart/Commands/Remove'
		);

		const updateTotal = () => {
			const total = $flow.internal.run( 'Components/Cart/Internal/UpdateTotal' ),
				component = this.getComponent();

			// Render on when empty state changes, to use JSX for showing empty/contain cart.
			if ( 0 === total ) {
				component.render();
			} else if ( ! this.prevTotal && total > 0 ) {
				component.render();
			}

			this.prevTotal = total;
		}

		$flow.internal.onAfter( 'Components/Cart/Internal/Add', updateTotal );
		$flow.commands.onAfter( 'Components/Cart/Commands/Remove', updateTotal )
	}
}

export default Controller;
