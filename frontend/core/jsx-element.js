import Element from 'CORE/element';

export default function JsxElement( tag, attributes, ...children ) {
	const appendChild = ( parent, child ) => {
		if ( Array.isArray( child ) ) {
			child.forEach( nestedChild => appendChild( parent, nestedChild ) )

		} else {

			parent.appendChild(
				child?.nodeType ? child : document.createTextNode( child )
			)
		}
	}

	const createElement = ( tag, props, children ) => {
		const element = document.createElement( tag )

		Object.entries( props || {} ).forEach( ( [ name, value ] ) => {
			element.setAttribute( name, value.toString() )
		} );

		children = children.filter( ( item ) => null !== item );

		children.forEach( child => {
			if ( child ) {
				appendChild( element, child );
			}
		} )

		return element;
	}

	if ( 'string' === typeof tag ) {
		return createElement( tag, attributes, children )
	}

	return Element;
}

