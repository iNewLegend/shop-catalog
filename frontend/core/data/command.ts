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
	    const endpoint = this.applyEndpointFormat( this.getEndpoint(), args.query );

        return Data.client._fetch( endpoint, args.type, args.data || null );
    }

    private applyEndpointFormat( endpoint: string, data = {} ): string {
	    if ( endpoint.includes( '{') ) {
            endpoint = endpoint.split( '/' ).map( ( endpointPart ) => {
                // @ts-ignore
                const match = endpointPart.match( '\\{(.*?)\\}');

                if ( match?.length ) {
                    if ( undefined !== typeof data[ match[ 1 ] ] ) {
                        return data[ match[ 1 ] ];
                    }
                }
                return endpointPart;
            } ).join( '/' );
        }

	    return endpoint;
	}
}
