/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging data command unit.
 */
import { Command } from './command';
import ForceMethod from "../../errors/force-method";

declare var $flow: any;

export abstract class CommandData extends Command {

    static getName() {
        return 'Core/Data/CommandData';
    }

    getEndpoint(): string {
        throw new ForceMethod( this, 'getEndpoint' );
    }

    apply( args = this.args, options = this.options ) {
        const endpoint = this.applyEndpointFormat( this.getEndpoint(), args.query );

        return $flow.data.constructor.client._fetch( endpoint, args.type, args.data || null );
    }

    private applyEndpointFormat( endpoint: string, data: any = {} ): string {
        if ( endpoint.includes( '{' ) ) {
            endpoint = endpoint.split( '/' ).map( ( endpointPart ) => {
                const match = endpointPart.match( '\\{(.*?)\\}' );

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

export default CommandData;