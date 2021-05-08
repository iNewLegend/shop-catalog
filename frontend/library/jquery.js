/**
 * @file: library/jquery.js
 * @author: see each function.
 * @description: JQuery Addons
 * TODO: Remove jQuery should be removed.
 */

export function JQuery_GetSelector( $ ) {
	// https://stackoverflow.com/posts/15623322/revisions

	if ( typeof $.get_selector === 'function' ) return;

	var get_selector = function( element ) {
		var pieces = [];

		for ( ; element && element.tagName !== undefined; element = element.parentNode ) {
			if ( element.className ) {
				var classes = element.className.split( ' ' );
				for ( var i in classes ) {
					if ( classes.hasOwnProperty( i ) && classes[ i ] ) {
						pieces.unshift( classes[ i ] );
						pieces.unshift( '.' );
					}
				}
			}
			if ( element.id && ! /\s/.test( element.id ) ) {
				pieces.unshift( element.id );
				pieces.unshift( '#' );
			}
			pieces.unshift( element.tagName );
			pieces.unshift( ' > ' );
		}

		return pieces.slice( 1 ).join( '' );
	};

	$.fn.getSelector = function( only_one ) {
		if ( true === only_one ) {
			return get_selector( this[ 0 ] );
		} else {
			return $.map( this, function( el ) {
				return get_selector( el );
			} );
		}
	};
}

//------------------------------------------------------------------------------------------------------------------------

export function JQuery_AttrChange( $ ) {
	// https://stackoverflow.com/questions/1950038/jquery-fire-event-if-css-class-changed

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	$.fn.attrchange = function( callback ) {
		if ( MutationObserver ) {
			var options = {
				subtree: false,
				attributes: true
			};

			var observer = new MutationObserver( function( mutations ) {
				mutations.forEach( function( e ) {
					callback.call( e.target, e.attributeName );
				} );
			} );

			return this.each( function() {
				observer.observe( this, options );
			} );

		}
	}

}

//------------------------------------------------------------------------------------------------------------------------

const LibJQuery = {
	addAttrChange: JQuery_AttrChange,
	addGetSelector: JQuery_GetSelector
};

export default LibJQuery;
