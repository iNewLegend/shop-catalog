export default class HTML {
	static getName() {
		return 'Flow/Library/HTML';
	}

	/**
	 * @param {string} html HTML representing a single element
	 * @return {Node}
	 */
	static toNode( html ) {
		const template = document.createElement( 'template' );

		html = html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;

		return template.content.firstChild;
	}

	/**
	 * @param {String} html HTML representing any number of sibling elements
	 * @return {NodeList}
	 */
	static toNodes( html ) {
		const template = document.createElement( 'template' );

		template.innerHTML = html;

		return template.content.childNodes;
	}
}
