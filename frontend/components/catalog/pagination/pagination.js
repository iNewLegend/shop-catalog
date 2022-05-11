/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: component for pagination.
 */
import './pagination.css';
import Controller from './controller';


export class Pagination extends $flow.Component {
	static getName() {
		return 'Components/Catalog/Pagination';
	}

	static getControllerClass() {
		return Controller;
	}

	constructor( parent, options ) {
		super( parent, options );

		this.logger = new $flow.modules.Logger( Pagination.getName(), true, { sameColor: true } );

		this.logger.startWith( { options } );

		this.page = 0;
		this.events = {};

		$flow.managers.internal.onBeforeUI( 'Components/Catalog/Pagination/Internal/Set', ( args ) => {
			this.show();

			// Clear.
			this.elements.placeHolder.html( '' );

			if ( this.anchors ) {
				this.anchors.forEach( ( anchor ) => {
					anchor.element.remove();
				} );
			}

			this.anchors = [];
		} )

		$flow.managers.internal.onAfterUI( 'Components/Catalog/Pagination/Internal/Set', ( args ) => {
			const { next, prev, placeHolder } = this.elements;


			// Create pages.
			for ( let i = 0; i < args.pages; ++i ) {
				const anchor = new $flow.Element( placeHolder, `<a href="#">${i + 1}</a>` );

				this.anchors.push( anchor );

				anchor.render();
				anchor.click(  () => {
					$flow.managers.commands.run( 'Components/Catalog/Pagination/Commands/Set-Page', { page: i } );
				} );

				this.show();
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

	template() {
		return () => (
			<div id="pagination" class="pagination hidden">
				<div class="pagination">
					<a onClick="$flow.managers.commands.run( 'Components/Catalog/Pagination/Commands/Set-Page', { page: this.page - 1 } )" class="prev" href="#">&laquo;</a>
					<span class="placeholder"/>
					<a onClick="$flow.managers.commands.run( 'Components/Catalog/Pagination/Commands/Set-Page', { page: this.page + 1 } )" class="next" href="#">&raquo;</a>
				</div>
			</div>
		);
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			self: this.view.element,
			prev: $flow.Factory.createElement( "#pagination .prev" ),
			next: $flow.Factory.createElement( "#pagination .next" ),
			placeHolder: $flow.Factory.createElement( '#pagination .placeholder' )
		};
	}
}

export default Pagination;
