/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages sidebar.
 */
import Controller from './controller';

import { getComponent } from '@appflux/mvc'

/* global $flow */

export default class SidebarComponent extends getComponent() {
	static getName() {
		return 'Components/Sidebar/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		super.initialize( options );

		this.elements = {
			overlay: $flow.Factory.createElement( '#overlay' ),
		}

		this.elements.overlay.click(
			() => $flow.managers.commands.run( 'Components/Sidebar/Commands/Toggle', { state: false } )
		);

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
		this.getView().element.addClass( 'show' )

		this.elements.overlay.fadeIn();
	}

	onHide() {
		this.getView().element.removeClass( 'show' )

		setTimeout( () => this.elements.overlay.fadeOut(), 400 );
	}
}
