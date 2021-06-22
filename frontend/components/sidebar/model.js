export default class Model extends ( $core.Model ) {
	static getName() {
		return 'Components/Sidebar/Model';
	}

	state = this.boolean();
}
