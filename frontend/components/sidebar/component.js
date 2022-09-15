/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import Controller from './controller';

import $flow from "@appsflow/core";
import $mvc from '@appsflow/mvc';

export default class SidebarComponent extends $mvc.Component {
	static getName() {
		return 'Components/Sidebar/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		super.initialize( options );

		this.elements = {
			overlay: $mvc.Factory.createElement( '#overlay' ),
		}

		this.elements.overlay.click(
			() => $flow.managers().commands.run( 'Components/Sidebar/Commands/Toggle', { state: false } )
		);

		this.model.on( 'change', () => {
			this.model.state ?
				this.onShow() :
				this.onHide();
		} );
	}

	template() {
		return this.parent.querySelector( '#sidebar' );
	}

	onShow() {
		this.getView().element.addClass( 'show' )

		this.elements.overlay.fadeIn();
	}

	onHide() {
		this.getView().element.removeClass( 'show' )

		setTimeout( () => this.elements.overlay.fadeOut(), 400 );
	}
}
