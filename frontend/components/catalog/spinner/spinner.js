/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
import './spinner.css';

export class Spinner extends $flow.Component {
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

			if ( callback ) callback();
		}, ms );
	}
}

export default Spinner;
