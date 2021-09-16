/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

/**
 * @memberOf core.controllers.errors
 */
export class ControllerAlreadyRegistered extends Error {
	/**
	 * @param {core.controllers.Controller} controller
	 */
	constructor( controller ) {
		super( `Controller: '${ controller.getName() }' is already registered` );
	}
}

export default ControllerAlreadyRegistered;
