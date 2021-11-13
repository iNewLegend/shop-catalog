/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import * as commands from "./commands/";
import * as data from "./data/";
import * as internal from "./internal/";

/**
 * @memberOf components.cart
 */
export class Controller extends ( $core.controllers.Controller ) {
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
		$core.commands.onAfterAffect(
			'Components/Cart/Item/Commands/Remove',
			'Components/Cart/Commands/Remove'
		);

		$core.commands.onAfter( 'Components/Cart/Commands/Remove', ( args ) => {
			// TODO: The element should automatically know that he has been deleted and remove its own view.
			args.model._options.owner.remove();

			const component = this.getComponent();

			if ( 0 === component.model.items.length ) {
				component.render();
			}

			$core.internal.run( 'Components/Cart/Internal/UpdateTotal' );
		} )

		$core.data.onAfter( 'Components/Cart/Data/Add', ( args ) => {
			const component = this.getComponent();

			if ( 0 === component.model.items.length ) {
				// TODO: Avoid use of timeout have hook on internal.run(Components/Cart/Data/Add) instead.
				setTimeout( () => {
                    component.render();

					$core.internal.run( 'Components/Cart/Internal/UpdateTotal' );
				} );
			} else {
				$core.internal.run( 'Components/Cart/Internal/UpdateTotal' );
			}
		} );
	}
}

export default Controller;
