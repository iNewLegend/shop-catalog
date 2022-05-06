/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 */

export class ControllerAlreadyRegistered extends Error {
	/**
	 * @param {$flow.Controller} controller
	 */
	constructor( controller ) {
		super( `Controller: '${controller.getName()}' is already registered` );
	}
}

export default ControllerAlreadyRegistered;
