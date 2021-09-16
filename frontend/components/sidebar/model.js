/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Sidebar model.
 */

/**
 * @memberOf components.sidebar
 */
export default class Model extends ( $core.Model ) {
	static getName() {
		return 'Components/Sidebar/Model';
	}

	state = this.boolean();
}
