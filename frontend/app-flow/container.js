/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
import ElementBase from './base/element';

/**
 * @name $flow.Container
 */
export class Container extends ElementBase {
	static RENDER_WITHOUT_CHILD = 'RENDER_WITHOUT_CHILD';

	static getName() {
		return 'Flow/Container';
	}

	initialize() {
		this.events = {
			onBeforeRender: ( /* Container */ container ) => {},
			onAfterRender: ( /* Container */ Container ) => {},
		};

	}

	beforeRender() {
		const { onBeforeRender } = this.events;

		if ( onBeforeRender ) {
			onBeforeRender( this.child || Container.RENDER_WITHOUT_CHILD );
		}

		super.beforeRender();
	}

	render( preventDefault ) {
		if ( ! preventDefault ) this.beforeRender();

		// Self Re-render.
		super.render( true );

		// Re-render of child.
		if ( this.child ) {
			this.child.render();
		}

		if ( ! preventDefault ) this.afterRender();
	}

	afterRender() {
		super.afterRender();

		const { onAfterRender } = this.events;

		if ( onAfterRender ) {
			onAfterRender( this.child || Container.RENDER_WITHOUT_CHILD );
		}
	}

	/**
	 * @param {Container} child
	 */
	set( child ) {
		if ( ! (child instanceof Container) ) {
			throw new Error( 'Child required to be container' );
		}

		this.child = child;
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'render:before'|'render:after'} event
	 * @param {{function()}} callback
	 *
	 * @returns {Boolean}
	 */
	on( event, callback ) {
		switch ( event ) {
			case 'render:before':
				return !! (this.events.onBeforeRender = callback);

			case 'render:after':
				return !! (this.events.onAfterRender = callback);

			default:
				throw new Error( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
		}
	}
}

export default Container;
