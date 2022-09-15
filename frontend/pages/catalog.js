/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Catalog page.
 */
import Page from '../modules/page';
import * as components from '../components/';

export class Catalog extends Page {
	static getName() {
		return 'Pages/Catalog';
	}

	initialize( options ) {
		super.initialize( options );

		this.logger.name = Catalog.getName();
		this.logger.startWith( { options } );

		this.catalog = new components.Catalog( this );
	}

	render( preventDefault ) {
		this.logger.startWith( { preventDefault } );

		return super.render( preventDefault );
	}

	afterRender() {
		super.afterRender();

		this.catalog.render();
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @inheritDoc
	 *
	 * @param {'product:add','recv:once'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		return this.catalog.on( event, callback ) || super.on( event, callback );
	}
}

export default Catalog;
