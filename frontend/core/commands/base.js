/**
 * @file: core/commands/base.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all commands instances, part of MVC, responsible for commands, and managed by Controller.
 */
import ForceMethod from "CORE/errors/force-method";
import Core from "CORE/base/core";

/**
 * @abstract
 * @memberOf core.commands
 */
export default class CommandBase extends Core {
	constructor( args = {}, options = {} ) {
		super();

		const { component } = args;

		// TODO: Duplicate code replace with `component.logger.cloneWithName`.
		if ( component.logger ) {
			this.logger = component.logger.clone();
			this.logger.name = this.getName();

			this.logger.startWith( { args, options } );
		}

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
		return this.apply();
	}
}
