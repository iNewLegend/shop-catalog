/**
 * @file: core/data/command.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging data command unit.
 */
import { Command as CommandBase } from "../commands/command";
import Data from '../data'
import ForceMethod from "../errors/force-method";

/**
 * @memberOf core.data
 */
export abstract class Command extends CommandBase {
	static getNamespace() {
		return 'Core/Data'
	}

	static getName() {
		return 'Core/Data/Command';
	}

	getEndpoint(): string {
		throw new ForceMethod( this, 'getEndpoint' );
	}

	apply( args = this.args, options = this.options ) {
        return Data.client._fetch( this.getEndpoint(), args.type, args.data || null );
    }
}
