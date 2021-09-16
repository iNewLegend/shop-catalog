/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

/**
 * @memberOf core.commands.errors
 */
export class CommandNotFound extends Error {
	/**
	 * @param {string} command
	 */
	constructor( command ) {
		super( `Command: '${ command }' is not found` );
	}
}

export default CommandNotFound;
