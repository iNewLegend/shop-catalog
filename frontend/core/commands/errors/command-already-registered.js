/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

/**
 * @memberOf core.commands.errors
 */
export class CommandAlreadyRegistered extends Error {
	/**
	 * @param {core.commands.Command} command
	 */
	constructor( command ) {
		super( `Command: '${ command.getName() }' is already registered` );
	}
}

export default CommandAlreadyRegistered;
