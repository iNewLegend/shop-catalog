/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Sidebar model.
 */
import $mvc from "@appsflow/mvc";

export default class Model extends $mvc.Model {
	state = this.boolean();

	static getName() {
		return 'Components/Sidebar/Model';
	}
}
