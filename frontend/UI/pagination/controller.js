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
		$flow.managers.internal.onBeforeUI( 'UI/Pagination/Internal/Set', ( args ) => {
			const { component } = this;

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

		$flow.managers.internal.onAfterUI( 'UI/Pagination/Internal/Set', ( args ) => {
			const { component } = this,
				{ next, prev, placeHolder } = component.elements;

			// Create pages.
			for ( let i = 0; i < args.pages; ++i ) {
				const anchor = new $flow.Element( placeHolder, `<a href="#">${i + 1}</a>` );

				component.anchors.push( anchor );

				anchor.render();
				anchor.click( () => {
					$flow.managers.commands.run( 'UI/Pagination/Commands/GetPage', { page: i } );
				} );

				component.show();
			}

			// Next.
			if ( args.current >= (args.pages - 1) ) {
				next.hide();
			} else {
				next.show();
			}

			// Prev.
			if ( 1 !== args.current ) {
				prev.hide();
			} else {
				prev.show();
			}
		} );
	}
}

export default Controller;
