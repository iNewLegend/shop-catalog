/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit commands.
 */
import * as commands from "./commands/";
import * as internal from './internal/';

export class Controller extends $flow.Controller {
	static getName() {
		return 'UI/Pagination/Controller';
	}

	getCommands() {
		return commands;
	}

	getInternal() {
		return internal
	}

	setupHooks() {
		$flow.managers.internal.onBeforeUI( 'UI/Pagination/Internal/Set', ( { component } ) => {
			component.show();

			// Clear.
			component.elements.placeHolder.html( '' );

			if ( component.anchors ) {
				component.anchors.forEach( ( anchor ) => {
					anchor.element.remove();
				} );
			}

			component.anchors = [];
		} )

		$flow.managers.internal.onAfterUI( 'UI/Pagination/Internal/Set', ( { component, pagination } ) => {
			const { next, prev, placeHolder } = component.elements;

			// Create pages.
			for ( let i = 0; i < pagination.pages; ++i ) {
				const anchor = new $flow.Element( placeHolder, `<a href="#">${i + 1}</a>` );

				component.anchors.push( anchor );

				anchor.render();
				anchor.click( () => {
					$flow.managers.commands.run( 'UI/Pagination/Commands/GetPage', {
						component,
						page: i
					} );
				} );

				component.show();
			}

			// Next.
			if ( pagination.current >= ( pagination.pages - 1 ) ) {
				next.hide();
			} else {
				next.show();
			}

			// Prev.
			if ( 1 !== pagination.current ) {
				prev.hide();
			} else {
				prev.show();
			}
		} );
	}
}

export default Controller;
