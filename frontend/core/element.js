/**
 * @file: core/element.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: WIP.
 * TODO:
 */
import Container from './container.js';

/**
 * @memberOf core
 */
export class Element extends Container {
	static getName() {
		return 'Core/Element';
	}

	initialize() {
		this.beforeInit();

		super.initialize();

		this.children = [];

		this.afterInit();
	}

	beforeInit() {
	}

	afterInit() {
	}

	afterRender( attachListeners = true ) {
		super.afterRender();

		this.parseChildren();
	}

	attachListener( method, callback ) {
		switch ( method ) {
			// TDO: Try remove the switch with good a guess.
			case 'onClick': {
				this.element.addEventListener( 'click', callback );
			}
			break;
		}
	}

	attachListenersFromHTMLElement( element, controller = this ) {
		let elements = {};

		if ( element.childNodes ) {
			elements = { element, ...element.childNodes };
		} else {
			elements = { element };
		}

		Object.values( elements ).forEach( ( currentElement ) => {
			if ( currentElement !== element ) {
				if ( currentElement instanceof HTMLElement ) {
					this.attachListenersFromHTMLElement( currentElement, controller );
				}

				for ( const entity in currentElement ) {
					if ( entity.startsWith( 'on' ) ) {
						currentElement[ entity ] = this.evalHandlers( currentElement[ entity ], controller );
					}
				}
			}
		} );
	}

	/**
	 * @param {Context} context
	 */
	attachListenersFromContext( context, controller ) {
		// Attach All `context` element events, to `target` component.
        let nodes = [];

		if ( context.node ) {
			nodes = [ context.node ];
		}

        if ( nodes.length > 0 && context.node.childNodes ) {
            nodes = [nodes, ...context.node.childNodes];
        } else {
        	// Support JSX.
            nodes = context.childNodes;
		}

        const handleNode = ( node ) => {
	        for ( let i in node ) {
		        if ( node[ i ] instanceof HTMLElement ) {
			        this.attachListenersFromHTMLElement( node[ i ], controller );
		        }

		        if ( i.startsWith( 'on' ) && node[ i ] ) {
			        this.evalHandlers( node[ i ], controller );
		        }
	        }
        }

		nodes.forEach( ( node ) => {
			handleNode( node );
		} );
	}

	evalHandlers( property, controller ) {
		if ( ! controller ) {
			return;
		}

		if ( property && property.toString().includes( 'this' ) ) {
			let funcContent = property.toString();

			funcContent = funcContent.replace( new RegExp( 'this', 'g' ), 'from' );
			funcContent = funcContent.substring( funcContent.indexOf( "{" ) + 1 ); // Get function body.
			funcContent = funcContent.replace(/}$/,'' ); // Remove the '}' of body.

			// In other words recreate the callback.
			property = ( event, from = controller ) => {
				eval( funcContent )
			};
		}

		return property;
	}

	parseChildren() {
		this.children = [];

		for ( const children of this.element.children ) {
			this.children.push( new Element( this.element, children ) );
		}
	}

	click( callback ) {
		this.attachListener( 'onClick', callback );
	}

	show() {
		this.element.classList.remove( 'hidden' )
	}

	hide() {
		this.element.classList.add( 'hidden' )
	}

	html( content ) {
		this.element.innerHTML = content.toString();
	}

	addClass( className ) {
		this.element.classList.add( className );
	}

	removeClass( className ) {
		this.element.classList.remove( className );
	}

	/**
	 * @source: https://gist.github.com/chrisbuttery/cf34533cbb30c95ff155
	 */
	fadeIn( sensitivity = .1 ) {
		const el = this.element;

		el.style.opacity = 0;
		el.style.display = "block";

        (function fade() {
            let val = parseFloat( el.style.opacity );
            if ( ! ( ( val += sensitivity ) > 1 ) ) {
                el.style.opacity = val;
                requestAnimationFrame( fade );
            }
		})();
	}

	/**
	 * @source: https://gist.github.com/chrisbuttery/cf34533cbb30c95ff155
	 */
	fadeOut( sensitivity = .1 ) {
		const el = this.element;

		el.style.opacity = 1;

        (function fade() {
            if ( ( el.style.opacity -= sensitivity ) < 0 ) {
                el.style.display = "none";
            } else {
                requestAnimationFrame( fade );
			}
		})();
	}
}

export default Element;
