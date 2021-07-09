/**
 * @file: components/spinner/spinner.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
import './spinner.css';

/**
 * @memberOf components
 */
export class Spinner extends $core.Component {
	static getNamespace() {
		return 'Components/Catalog'
	}

	static getName() {
		return 'Components/Catalog/Spinner';
	}

	template() {
		// TODO: Avoid style, move to css.
		return '<div class="spinner" style="border-top-color: lightskyblue"></div>';
	}

	fadeOut( ms, callback ) {
		setTimeout( () => {
			this.view.element.hide();

			if( callback ) callback();
		}, ms );
	}
}

export default Spinner;
