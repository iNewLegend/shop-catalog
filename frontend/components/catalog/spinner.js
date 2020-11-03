/**
 * @file: components/pagination.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import { Component } from 'MODULES';
import './spinner.css';

/**
 * @memberOf components
 */
export class Spinner extends Component {
	static getNamespace() {
		return 'Components/Catalog'
	}

	static getName() {
		return 'Components/Catalog/Spinner';
	}

	fadeOut( ms, callback ) {
		setTimeout( () => {
			this.view.element.hide();

			callback();
		}, ms );
	}

	template() {
		return '<div class="spinner" style="border-top-color: lightskyblue"></div>';
	}
}

export default Spinner;
