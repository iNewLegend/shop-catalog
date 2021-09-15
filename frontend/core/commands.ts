/**
 * @file: core/commands.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging commands, Part of MVC.
 */
import Core from "./base/core";
import Command from "./commands/command";
import Controller from "./controllers/controller";
import CommandAlreadyRegistered from "./commands/errors/command-already-registered";
import CommandNotFound from "./commands/errors/command-not-found";
import { Logger } from "./modules/";
import { Terminal } from "../services";

export interface CommandArgsInterface {
    [ key: string ]: any
}

interface OnAffectHookInterface {
    [ key: string ]: Array<String>
}

interface OnAfterOnceHookInterface {
    [ key: string ]: Array<Function>
}

type onAfterCallback = ( args: Object, options: Object ) => any

interface onAfterHookInterface {
    [ key: string ]: Array<onAfterCallback>
}

/**
 * @memberOf core
 */
export class Commands extends Core {

    static getName() {
        return 'Core/Commands';
    }

    private logger: Logger;

    private static runCallbacks( callbacks: Array<Function>, args: CommandArgsInterface = {}, options: Object = {} ) {
        if ( callbacks ) {
            for ( let i = 0; i != callbacks.length; ++i ) {
                const callback = callbacks.pop();

                if ( !callback ) {
                    break;
                }

                callback( args, options );
            }
        }
    }

    constructor() {
        super();

        this.logger = new Logger( this.getName(), true );
        this.logger.setOutputHandler( Terminal.onOutput );

        this.logger.startEmpty();
    }

    get Command() {
        return Command;
    }

    commands: { [ args: string ]: ( typeof Command ) } = {};

    onBeforeHooks: OnAfterOnceHookInterface = {};

    onAfterEffectHooks: OnAffectHookInterface = {};
    onAfterOnceHooks: OnAfterOnceHookInterface = {};
    onAfterHooks: onAfterHookInterface = {};

    public run( command: string | Command, args: CommandArgsInterface = {}, options = {} ) {
        if ( typeof command === "string" ) {
            command = this.getCommandInstance( command, args, options );
        }

        return this.runInstance( command, args, options );
    }

    public register( commands: Array<typeof Command>, controller: Controller ) {
        const result: typeof Command[] = [];

        Object.values( commands ).forEach( ( command ) => {
            // @ts-ignore
            const commandName = command.getName();

            if ( this.commands[ commandName ] ) {
                throw new CommandAlreadyRegistered( command );
            }

            command.controller = controller;

            this.commands[ commandName ] = command;

            result.push( command );
        } );

        return result;
    }

    public onBefore( hookCommand: string, callback: onAfterCallback ) {
        if ( !this.onBeforeHooks[ hookCommand ] ) {
            this.onBeforeHooks[ hookCommand ] = [];
        }

        this.onBeforeHooks[ hookCommand ].push( callback );
    }

    public onAfterOnce( command: string, callback: () => void ) {
        if ( !this.onAfterOnceHooks[ command ] ) {
            this.onAfterOnceHooks[ command ] = [];
        }

        this.onAfterOnceHooks[ command ].push( callback );
    }

    public onAfterAffect( hookCommand: string, affectCommand: string ) {
        if ( !this.onAfterEffectHooks[ hookCommand ] ) {
            this.onAfterEffectHooks[ hookCommand ] = [];
        }

        this.onAfterEffectHooks[ hookCommand ].push( affectCommand );
    }

    public onAfter( hookCommand: string, callback: onAfterCallback ) {
        if ( !this.onAfterHooks[ hookCommand ] ) {
            this.onAfterHooks[ hookCommand ] = [];
        }

        this.onAfterHooks[ hookCommand ].push( callback );
    }

    public getCommandInstance( name: string, args: CommandArgsInterface, options = {} ): Command {
        const CommandClass = this.commands[ name ];

        if ( !CommandClass ) {
            throw new CommandNotFound( name );
        }

        return new CommandClass( args, options );
    }

    public getAll() {
        return this.commands;
    }

    protected runInstance( command: Command, args: CommandArgsInterface = {}, options = {} ) {
        let result: any = null;

        this.logger.startWith( { command: command.getName(), options, 'CommandArgs': '->' } );
        this.logger.debug( 'CommandArgs:' );
        this.logger.object( args );

        if ( this.onBeforeHooks[ command.getName() ] ) {
            const callbacks = this.onBeforeHooks[ command.getName() ];
            callbacks.forEach( ( callback ) => callback( args ) );
        }

        result = command.run();

        if ( result instanceof Promise ) {
            result.then( ( _result ) => this.onAfterRun( command, args, options, _result ) )
        } else {
            this.onAfterRun( command, args, options, result );
        }

        return result;
    }

    protected onAfterRun( command: Command, args: CommandArgsInterface, options: Object, result : any ) {
        if ( this.onAfterEffectHooks[ command.getName() ] ) {
            this.onAfterEffectHooks[ command.getName() ].forEach( ( command ) => {
                args.result = result;

                result = this.run( command.toString(), args, options );
            } );
        }

        if ( this.onAfterHooks ) {
            args.result = result;

            Commands.runCallbacks( Object.assign( [], this.onAfterHooks[ command.getName() ] ), args, options );
        }

        if ( this.onAfterOnceHooks ) {
            const callbacks = this.onAfterOnceHooks[ command.getName() ];

            Commands.runCallbacks( callbacks );

            delete this.onAfterOnceHooks[ command.getName() ];
        }

        return result;
    }
}
