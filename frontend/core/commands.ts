/**
 * @file: core/commands.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging commands, Part of MVC.
 */
import Core from "./base/core";
import Command from "./commands/command";
import Controller from "./controllers/controller";
import CommandAlreadyRegistered from "./commands/errors/command-already-registered";
import { Logger } from "./modules/";
import CommandNotFound from "./commands/errors/command-not-found";

/**
 * TODO: Try avoid - Remove.
 */
interface CommandsClass {
    new (args: {}, options: {}): Command;

    getName: () => string,
    getNamespace:() => string,
}

export interface CommandArgsInterface {
    [key: string]: any
}

interface OnAffectHookInterface {
    [key: string]: Array<String>
}
interface OnAfterHookInterface {
    [key: string]: Array<Function>
}


/**
 * @memberOf core
 */
export class Commands extends Core {

    static getNamespace() {
        return 'Core'
    }

    static getName() {
        return 'Core/Commands';
    }

    private logger: Logger;

    constructor() {
        super();

        this.logger = new Logger( this.getName(), true );
        this.logger.startEmpty();
    }

    get Command() {
        return Command;
    }

    commands: { [args: string]: ( CommandsClass ) } = {};

	onAfterEffectHooks: OnAffectHookInterface = {};
    onAfterOnceHooks: OnAfterHookInterface = {};

    public run( command:string|Command, args:CommandArgsInterface = {}, options  = {} ) {
		if ( typeof command === "string" ) {
		    command = this.getCommandInstance( command, args, options );
        }

		return this.runInstance( command, args, options );
	}

	public register( commands: Array<Command>, controller: Controller ) {
		Object.values( commands ).forEach( ( command ) => {
			// @ts-ignore
            if ( this.commands[ command.getName() ] ) {
				throw new CommandAlreadyRegistered( command );
			}

			// @ts-ignore
            command.controller = controller;

			// @ts-ignore
            this.commands[ command.getName() ] = command;
		} );
	}

    public onAfterOnce( command: string, callback: () => void ) {
        if ( ! this.onAfterOnceHooks[ command ] ) {
            this.onAfterOnceHooks[ command ] = [];
        }

        this.onAfterOnceHooks[ command ].push( callback );
    }

	public onAfterAffect( hookCommand:string, affectCommand:string ) {
		if ( ! this.onAfterEffectHooks[ hookCommand ] ) {
			this.onAfterEffectHooks[ hookCommand ] = [];
		}

		this.onAfterEffectHooks[ hookCommand ].push( affectCommand );
	}

    public getCommandInstance( name: string, args: CommandArgsInterface, options = {} ): Command {
        const CommandClass = this.commands[ name ];

        if ( ! CommandClass ) {
            throw new CommandNotFound( name );
        }

        return new CommandClass( args, options );
    }

    protected runInstance( command: Command, args:CommandArgsInterface = {}, options  = {} ) {
        let result:any = null;

        this.logger.startWith( { command: command.getName(), args, options } );

        result = command.run();

        if ( this.onAfterEffectHooks[ command.getName() ] ) {
            this.onAfterEffectHooks[ command.getName() ].forEach( ( command ) => {
                // @ts-ignore
                const Command = this.commands[ command ];

                args.result = result;

                result = new Command( args, options ).run();
            } );
        }

        if ( this.onAfterOnceHooks ) {
            const callbacks = this.onAfterOnceHooks[ command.getName() ];

            if ( callbacks ) {
                for ( let i = 0 ; i != callbacks.length ; ++i ) {
                    const callback = callbacks.pop();

                    if ( ! callback ) {
                        break;
                    }

                    callback();
                }

                delete this.onAfterOnceHooks[ command.getName() ];
            }
        }

        return result;
    }
}
