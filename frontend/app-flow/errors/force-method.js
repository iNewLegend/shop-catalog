export class ForceMethodBase extends Error {
	/**
	 * @param {string} className
	 * @param {string} methodName
	 */
	constructor( className, methodName ) {
		super( `ForeMethod implementation: at '${className}' method: '${methodName}'   ` );
	}
}

export class ForceMethod extends Error {
	/**
	 * @param {Core} core
	 * @param {string} methodName
	 */
	constructor( core, methodName ) {
		super( `ForeMethod implementation: at '${core.getName()}' method: '${methodName}'   ` );
	}
}

export default ForceMethod;