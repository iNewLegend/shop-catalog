/**
 * @file: core/commands/base.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all commands instances, part of MVC, responsible for commands, and managed by Controller.
 */
import ForceMethod from "CORE/errors/force-method";
import Core from "CORE/base/core";
import Logger from "CORE/modules/logger";

/**
 * @abstract
 * @memberOf core.commands
 */
export default class CommandBase extends Core {
	static _logger;

	constructor( args = {}, options = {} ) {
		super();

		if ( ! this.constructor._logger ) {
			this.constructor._logger = new Logger( this.constructor.getName() );
		}

		this.logger = this.constructor._logger
		this.logger.startWith( { args, options } );

		this.initialize( args, options );
	}

	initialize( args, options ) {
		this.args = args;
		this.options =  options;
	}

	apply( args = this.args, options = this.options ) {
		throw new ForceMethod( this, 'apply' );
	}

	run() {
		return this.apply( this.args, this.options );
	}
}
