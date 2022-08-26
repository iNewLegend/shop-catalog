/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Sidebar model.
 */

/* global $flow */

export default class Model extends $flow.Model {
	state = this.boolean();

	static getName() {
		return 'Components/Sidebar/Model';
	}
}
