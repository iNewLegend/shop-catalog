export class ForceMethodBase extends Error {
	/**
	 * @param {string} className
	 * @param {string} methodName
	 */
	constructor( className, methodName ) {
		super( `ForeMethod implementation: at '${ className }' method: '${ methodName }'   ` );
	}
}

export default class ForceMethod extends Error {
	/**
	 * @param {core.Core} core
	 * @param {string} methodName
	 */
	constructor( core, methodName ) {
		super( `ForeMethod implementation: at '${ core.getName() }' method: '${ methodName }'   ` );
	}
}


