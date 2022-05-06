/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Module for logging instances.
 * TODO: on constructor add prefix for owner
 */

// TODO: Remove.
const CircularJSON = require( 'circular-json' );

/**
 * @name $flow.modules.Logger
 */
export class Logger {
	get name() {
		return this._name;
	}

	set name( val ) {
		this._name = val;
	}

	static wrappers = {};
	static sharedData = {};
	static colorsInUse = [];

	static createCustomWrapper( classType, callback ) {
		if ( ! this.wrappers[ classType ] ) {
			this.wrappers[ classType.name ] = [];
		}

		this.wrappers[ classType.name ].push( { classType, callback } );
	}

	static getName() {
		return 'Modules/Logger';
	}

	/**
	 * Function constructor() : Create logger class.
	 *
	 * @param {object} owner
	 * @param {boolean} state
	 * @param {object} args
	 */
	constructor( owner, state = false, args = {} ) {
		this.state = state;
		this.args = args;
		this._name = '';

		if ( typeof owner == 'string' ) {
			this._name = owner;
		} else {
			this._name = owner.constructor.name;
		}

		if ( state ) {
			this.initialize();
		}
	}

	/**
	 * Function initialize() : Initialize logger class.
	 */
	initialize() {
		if ( this.args.sameColor ) {
			if ( ! Logger.sharedData[ this._name ] ) {
				Logger.sharedData[ this._name ] = this.getRandomColor();
			}

			this.color = Logger.sharedData[ this._name ];
		} else {
			this.color = this.getRandomColor();

			Logger.colorsInUse.push( this.color );
		}

		this.outputHandler = console.log.bind();

		this.defaultStyle = [
			'color: grey;font-size:7px',
			'display: block',
			`color: ${this.color}`,
			'color: black',
			'font-weight: bold',
			'color: black',
			'font-size: 16px;color: red;font-weight:800'
		];
	}

	/**
	 * Function functionView() : Return function preview.
	 *
	 * @param {{function()}} fn
	 */
	functionView( fn ) {
		let fReturn = 'anonymous function()';

		if ( fn.name.length !== 0 ) {
			fReturn = fn.name.split( ' ' )[ 1 ] + '()';
		}

		return fReturn;
	}

	/**
	 * Function printFunctionNotify() : Print simple log for notify source (function).
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {*} output
	 */
	printFunctionNotify( type, source, output ) {
		this.out.apply( this, [ `%c(${type})-> %c%c${this._name}%c::%c${source}%c() ${output}%c` ].concat( this.defaultStyle ) );
	}

	/**
	 * Function printInLineElement() : Print in line element.
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {string} key
	 * @param {*} value
	 */
	printInLineElement( type, source, key, value ) {
		this.out.apply( this, [ `%c(${type})-> %c%c${this._name}%c::%c${source}%c() ->> ${key}: '${value}'%c` ].concat( this.defaultStyle ) );
	}

	/**
	 * Function printInLineFunction() : Print in line function.
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {string} key
	 * @param {{function()}} fn
	 */
	printInLineFunction( type, source, key, fn ) {
		fn = this.functionView( fn );

		this.printInLineElement( type, source, key, fn );
	}

	/**
	 * Function printInLineString() : Print in line string.
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {string} string
	 */
	printInLineString( type, source, string ) {
		this.printInLineElement( type, source, '(string)', string );
	}

	/**
	 * Function printNextlineObject() : Print object in next line.
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {string} key
	 * @param {{}} obj
	 */
	printNextlineObject( type, source, key, obj ) {
		// obj = Object.assign( {}, obj );

		this.out.apply( this, [ `%c(${type})-> %c%c${this._name}%c::%c${source}%c() ->> ${key} %c↓` ].concat( this.defaultStyle ) );
		// print in next line
		this.out( obj );
	}

	/**
	 * Function _printMultiLineObject() : Print object in multiline format.
	 *
	 * @param {string} type
	 * @param {string} source
	 * @param {{}} obj
	 */
	printMultiLineObject( type, source, obj ) {
		// obj = Object.assign( {}, obj );

		// print long (multiline) object
		this.out.apply( this, [ `%c(${type})-> %c%c${this._name}%c::%c${source}%c(${Object.keys( obj ).join( ', ' )}) %c↓` ].concat( this.defaultStyle ) );

		for ( let key in obj ) {
			if ( typeof obj[ key ] === 'object' ) {
				obj[ key ] = CircularJSON.stringify( this.useWrapper( obj[ key ] ) );
			} else if ( typeof obj[ key ] == 'function' ) {
				obj[ key ] = this.functionView( obj[ key ] );
			}

			this.out.apply( this, [ "%c" + key + ": `" + this.useWrapper( obj[ key ] ) + "`", 'color: #a3a3a3' ] );
		}
	}

	/**
	 * Function getCallerName() : Return caller name.
	 */
	getCallerName() {
		const caller = Error().stack.split( '\n' )[ 3 ].trim();

		if ( caller.startsWith( 'at new' ) ) {
			return 'constructor';
		}

		return caller.split( '.' )[ 1 ].split( ' ' )[ 0 ];
	}

	/**
	 * Function getRandomColor() : Return random color.
	 */
	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';

		for ( let i = 0; i < 6; i++ ) {
			color += letters[ Math.floor( Math.random() * 16 ) ];
		}

		/**
		 * Function hexColorDelta() : Return color difference in ratio decimal point.
		 *
		 * @param {string} hex1
		 * @param {string} hex2
		 *
		 * @see http://jsfiddle.net/96sME/
		 */
		const hexColorDelta = function( hex1, hex2 ) {
			hex1 = hex1.replace( '#', '' );
			hex2 = hex2.replace( '#', '' );

			// get red/green/blue int values of hex1
			const r1 = parseInt( hex1.substring( 0, 2 ), 16 );
			const g1 = parseInt( hex1.substring( 2, 4 ), 16 );
			const b1 = parseInt( hex1.substring( 4, 6 ), 16 );
			// get red/green/blue int values of hex2
			const r2 = parseInt( hex2.substring( 0, 2 ), 16 );
			const g2 = parseInt( hex2.substring( 2, 4 ), 16 );
			const b2 = parseInt( hex2.substring( 4, 6 ), 16 );
			// calculate differences between reds, greens and blues
			let r = 255 - Math.abs( r1 - r2 );
			let g = 255 - Math.abs( g1 - g2 );
			let b = 255 - Math.abs( b1 - b2 );
			// limit differences between 0 and 1
			r /= 255;
			g /= 255;
			b /= 255;
			// 0 means opposit colors, 1 means same colors
			return (r + g + b) / 3;
		};

		let similar = Logger.colorsInUse.some( ( value ) => {
			// it return the ratio of diffrence... closer to 1.0 is less difference.

			if ( hexColorDelta( color, value ) < 0.8 ) {
				return false;
			}

			return true;
		} );

		// if the color is similar, try again.
		if ( similar ) {
			return this.getRandomColor();
		}

		return color;
	}

	/**
	 * Set output handler
	 *
	 * @param {function(...args)} outputHandler
	 */
	setOutputHandler( outputHandler ) {
		this.outputHandler = outputHandler;
	}

	useWrapper( obj ) {
		let result = obj;

		if ( result && 'object' === typeof result ) {
			let stop = false;

			Object.values( Logger.wrappers ).forEach( ( [ wrapper ] ) => {
				if ( obj instanceof wrapper.classType ) {
					result = wrapper.callback( result );
					stop = true;
				}
			} );

			if ( stop ) {
				return result;
			}

			result = Object.values( result ).map( ( value ) => {
				return this.useWrapper( value );
			} );
		}

		const key = obj?.constructor?.name;

		if ( Logger.wrappers[ key ] ) {
			Logger.wrappers[ key ].forEach( ( wrapper ) => {
				result = wrapper.callback( result )
			} );
		}

		return result;
	}

	/**
	 * Function out() : Print console log with style
	 */
	out( ...args ) {
		this.outputHandler.apply( this, args );
	}

	/**
	 * Function startEmpty() : Notify function start without args.
	 *
	 * @param {string} output
	 */
	startEmpty( output = '' ) {
		if ( ! this.state ) return;

		this.printFunctionNotify( 'se', this.getCallerName(), output );
	}

	/**
	 * Function startWith() : Notify function start with args.
	 *
	 * @param {*} output
	 */
	startWith( params ) {
		if ( ! this.state ) return;

		params = Object.assign( {}, params );

		const type = 'se';
		const source = this.getCallerName();

		if ( typeof params == "string" ) {
			this.printInLineString( type, source, params );

		} else if ( Object.keys( params ).length === 1 ) {
			const key = Object.keys( params )[ 0 ];
			let value = Object.values( params )[ 0 ];

			// function check is repated logic, handle it.
			if ( typeof value === 'object' ) {
				this.printNextlineObject( type, source, key, value );
			} else if ( typeof value == 'function' ) {
				this.printInLineFunction( type, source, key, value )
			} else {
				this.printInLineElement( type, source, key, value );
			}
		} else {
			this.printMultiLineObject( type, source, params );
		}
	}

	/**
	 * Function recv() : Notify recv from server
	 *
	 * @param {{}} params
	 * @param {{}|[]} data
	 */
	recv( params, data ) {
		if ( ! this.state ) return;

		const source = this.getCallerName();

		for ( let key in params ) {
			this.out.apply( this, [ `%c(rv)-> %c%c${this._name}%c::%c${source}%c() ->> ${key}: '${params[ key ]}' %c↓` ].concat( this.defaultStyle ) );
		}

		this.out( data );
	}

	/**
	 * Function object() : Prints object
	 *
	 * @param {{}} params
	 * @param {string} notice
	 */
	object( params, notice = '' ) {
		if ( ! this.state ) return;

		const source = this.getCallerName();

		params = Object.create( params );

		for ( let key in params ) {
			// TODO: Avoid - Logger should not know about component find better solution.
			if ( params[ key ] instanceof $flow.modules.Component ) {
				params[ key ] = {
					model: params[ key ].model.getModelData(),
				}
				params[ key ] = CircularJSON.stringify( params[ key ] );

			} else if ( typeof params[ key ] === 'object' ) {
				params[ key ] = CircularJSON.stringify( params[ key ] );
			}

			this.out.apply( this, [ `%c(ob)-> %c%c${this._name}%c::%c${source}%c() [${notice}] ->> ${key}: '${params[ key ]}'%c` ].concat( this.defaultStyle ) );
		}
	}

	/**
	 * Function debug() : Notify debug.
	 * `
	 * @param {string} output
	 */
	debug( output ) {
		if ( ! this.state ) return;

		this.printFunctionNotify( 'db', this.getCallerName(), output );
	}

	/**
	 * Function throw() : Throws error
	 *
	 * @param {string} output
	 * @param {string} name
	 * @param {*} params
	 */
	throw( output, name = null, params = null ) {
		this.printFunctionNotify( 'tw', this.getCallerName(), output );

		if ( params ) this.printNextlineObject( 'tw', this.getCallerName(), name, params );

		throw (new Error().stack);
	}

	clone() {
		return Object.assign( Object.create( Object.getPrototypeOf( this ) ), this );
	}
}

export default Logger;
