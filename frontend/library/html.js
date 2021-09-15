export default class HTML {

	static getName() {
		return 'Library/HTML';
	}

	/**
	 * @param {String} HTML representing a single element
	 * @return {Node}
	 */
	static toNode( html ) {
		const template = document.createElement( 'template' );

		html = html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;

		return template.content.firstChild;
	}

	/**
	 * @param {String} HTML representing any number of sibling elements
	 * @return {NodeList}
	 */
	static toNodes( html ) {
		const template = document.createElement( 'template' );

		template.innerHTML = html;

		return template.content.childNodes;
	}
}
