/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: component for pagination.
 */
import './pagination.css';

import Controller from './controller';

import { getComponent } from "@appflux/mvc";

export class Component extends getComponent() {
	static getName() {
		return 'UI/Pagination';
	}

	static getControllerClass() {
		return Controller;
	}

	constructor( parent, options ) {
		super( parent, options );

		this.logger = new $flow.modules.Logger( Component.getName(), true, { sameColor: true } );

		this.logger.startWith( { options } );

		this.page = 0;
		this.events = {};
	}

	template() {
		return `
			<div id="pagination" class="pagination hidden">
				<div class="pagination">
					<a onClick="$flow.managers.commands.run( 'UI/Pagination/Commands/GetPage', { component: this, page: this.page - 1 } )"
					   class="prev" href="#">&laquo;</a>
					<span class="placeholder"/>
					<a onClick="$flow.managers.commands.run( 'UI/Pagination/Commands/GetPage', { component: this, page: this.page + 1 } )"
					   class="next" href="#">&raquo;</a>
				</div>
			</div>
		`;
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

export default Component;
