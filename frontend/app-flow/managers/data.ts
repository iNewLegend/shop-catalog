/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging data commands.
 */
import { CommandArgsInterface, Commands } from './commands'
import { CommandData } from '../command-bases/command-data';

import Http from '../clients/http';

export class Data extends Commands {
    public static client: Http;

    private type: string;

    constructor() {
        super();

        // @ts-ignore
        this.constructor.client = new Http( 'http://localhost:8081' );
    }

    // @ts-ignore
    get Command() {
        return CommandData;
    }

    static getName() {
        return 'Flow/Managers/Data';
    }

    public get( command: string, args: CommandArgsInterface = {}, options: {} = {} ) {
        this.type = 'get';

        return super.run( command, args, options );
    }

    public post( command: string, args: CommandArgsInterface = {}, options: {} = {} ) {
        this.type = 'post';

        return super.run( command, args, options );
    }

    protected async runInstance( command: CommandData, args: CommandArgsInterface = {}, options: {} = {} ) {
        if ( ! this.type ) {
            throw new Error( 'Cannot run directly' );
        }
        // New args.
        command.args = {
            type: this.type,
        };
        if ( 'get' === this.type ) {
            command.args.query = args;
        } else {
            command.args.data = args;
        }

        args.result = await super.runInstance( command, args, options )

        // Clear type.
        this.type = '';

        return args.result;
    }
}

export default Data;
