/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import Controller from './controller';
import Model from './model.js';

/**
 * @memberOf components.sidebar
 */
export default class Component extends $core.Component {
	static getName() {
		return 'Components/Sidebar/Component';
	}

	static getModelClass() {
		return Model;
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		super.initialize( options );

		this.elements = {
			overlay: $core.Factory.createElement( '#overlay' ),
		}

		this.elements.overlay.click( () => $core.commands.run( 'Components/Sidebar/Commands/Toggle', { state: false } ) );

		this.model.on( 'change', () => {
			const state = this.model.state;
				state ?
				this.onShow() :
				this.onHide();
		} );
	}

	template() {
		return this.parent.querySelector( '#sidebar' );
	}

	onShow() {
		this.view.element.addClass( 'show' )

		this.elements.overlay.fadeIn();
	}

	onHide() {
		this.view.element.removeClass( 'show' )

		setTimeout( () => this.elements.overlay.fadeOut(), 400 );
	}
}
