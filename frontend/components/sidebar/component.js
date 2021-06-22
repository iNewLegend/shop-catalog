import Controller from './controller';
import Model from './model.js';

export default class Component extends ( $core.Component ) {
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

		this.model.on( 'change', () => {
			const state = this.model.state;
				state ?
				this.view.element.addClass( 'show' ) :
				this.view.element.removeClass( 'show' );
		} );
	}

	template() {
		return this.parent.querySelector( '#sidebar' );
	}
}
