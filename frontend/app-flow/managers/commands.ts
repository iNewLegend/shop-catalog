/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging commands, Part of MVC.
 */
import { CommandPublic } from '../command-bases/command-public';
import { Terminal } from "../../services/terminal";
import { Logger } from '../modules/logger';

import { CommandAlreadyRegistered, CommandNotFound } from '../errors/'

import Controller from '../controller'
import Core from '../base/core';

type CommandCallbackType = (args: Object, options: Object ) => any

export interface CommandArgsInterface {
    [ key: string ]: any
}

interface OnHookAffectInterface {
    [ key: string ]: Array<String>
}

interface OnHookInterface {
    [ key: string ]: Array<CommandCallbackType>
}

export class Commands extends Core {
    commands: { [ key: string ]: ( typeof CommandPublic ) } = {};

    onBeforeHooks: OnHookInterface = {};

    onAfterHooks: OnHookInterface = {};
    onAfterOnceHooks: OnHookInterface = {};
    onAfterAffectHooks: OnHookAffectInterface = {};

    private logger: Logger;

    constructor() {
        super();

        this.logger = new Logger( this.getName(), true );
        this.logger.setOutputHandler( Terminal.onOutput );

        this.logger.startEmpty();
    }

    get Command() {
        return CommandPublic;
    }

    static getName() {
        return 'Flow/Managers/Commands';
    }

    private static runCallbacks( callbacks: Array<Function>, args: CommandArgsInterface = {}, options: Object = {} ) {
        if ( callbacks ) {
            for ( let i = 0; i != callbacks.length; ++i ) {
                const callback = callbacks.pop();

                if ( ! callback ) {
                    break;
                }

                callback( args, options );
            }
        }
    }

    public run( command: string | CommandPublic, args: CommandArgsInterface = {}, options = {} ) {
        if ( typeof command === "string" ) {
            command = this.getCommandInstance( command, args, options );
        }

        return this.runInstance( command, args, options );
    }

    public register( commands: Array<typeof CommandPublic>, controller: Controller ) {
        const result: typeof CommandPublic[] = [];

        Object.values( commands ).forEach( ( command ) => {
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

    public getCommandInstance( name: string, args: CommandArgsInterface, options = {} ): CommandPublic {
        const CommandClass = this.commands[ name ];

        if ( ! CommandClass ) {
            throw new CommandNotFound( name );
        }

        return new CommandClass( args, options );
    }

    public getAll() {
        return this.commands;
    }

    public onBefore( hookCommand: string, callback: CommandCallbackType ) {
        if ( ! this.onBeforeHooks[ hookCommand ] ) {
            this.onBeforeHooks[ hookCommand ] = [];
        }

        this.onBeforeHooks[ hookCommand ].push( callback );
    }

    public onAfter( hookCommand: string, callback: CommandCallbackType ) {
        if ( ! this.onAfterHooks[ hookCommand ] ) {
            this.onAfterHooks[ hookCommand ] = [];
        }

        this.onAfterHooks[ hookCommand ].push( callback );
    }

    public onAfterOnce( command: string, callback: () => void ) {
        if ( ! this.onAfterOnceHooks[ command ] ) {
            this.onAfterOnceHooks[ command ] = [];
        }

        this.onAfterOnceHooks[ command ].push( callback );
    }

    public onAfterAffect( hookCommand: string, affectCommand: string ) {
        if ( ! this.onAfterAffectHooks[ hookCommand ] ) {
            this.onAfterAffectHooks[ hookCommand ] = [];
        }

        this.onAfterAffectHooks[ hookCommand ].push( affectCommand );
    }

    protected runInstance( command: CommandPublic, args: CommandArgsInterface = {}, options = {} ) {
        let result: any = null;

        this.logger.startWith( { command: command.getName(), options, 'CommandArgs': '->' } );
        this.logger.debug( 'CommandArgs:' );
        this.logger.object( args );

        if ( this.onBeforeHooks[ command.getName() ] ) {
            const callbacks = this.onBeforeHooks[ command.getName() ];
            callbacks.forEach( ( callback ) => callback( args, options ) );
        }

        result = command.run();

        if ( result instanceof Promise ) {
            result.then( ( _result ) => this.onAfterRun( command, args, options, _result ) )
        } else {
            this.onAfterRun( command, args, options, result );
        }

        return result;
    }

    protected onAfterRun( command: CommandPublic, args: CommandArgsInterface, options: Object, result: any ) {
        if ( this.onAfterAffectHooks[ command.getName() ] ) {
            this.onAfterAffectHooks[ command.getName() ].forEach( (command ) => {
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

export default Commands;