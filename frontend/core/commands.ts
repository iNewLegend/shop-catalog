/**
 * @file: core/commands.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging commands, Part of MVC.
 */
import Core from "./base/core";
import Command from "./commands/command";
import Controller from "./controllers/controller";
import CommandAlreadyRegistered from "./commands/errors/command-already-registered";

/**
 * TODO: Try avoid - Remove.
 */
interface CommandsClass {
    new (args: {}, options: {}): Command;

    getName: () => string,
    getNamespace:() => string,
}

interface CommandArgs {
    [key: string]: any
}

interface OnAffectHookInterface {
    [key: string]: Array<String>
}

/**
 * @memberOf core
 */
export class Commands extends Core {
    public Command = Command;

    commands: { [args: string]: ( CommandsClass ) } = {};

	onAfterEffectHooks: OnAffectHookInterface = {};

    public run( command:string, args:CommandArgs = {}, options  = {} ) {
		const commandConstructor = this.commands[ command ];

		let result = new commandConstructor( args, options ).run();

		if ( this.onAfterEffectHooks[ commandConstructor.getName() ] ) {
			this.onAfterEffectHooks[ commandConstructor.getName() ].forEach( ( command ) => {
				// @ts-ignore
                const Command = this.commands[ command ];

				args.result = result;

				result = new Command( args, options ).run();
			} );
		}
	}

	public register( commands: Array<Command>, controller: Controller ) {
		Object.values( commands ).forEach( ( command ) => {
			// @ts-ignore
            if ( this.commands[ command.getName() ] ) {
				throw new CommandAlreadyRegistered( command );
			}

			// Register.
			command.controller = controller;

			// @ts-ignore
            this.commands[ command.getName() ] = command;
		} );
	}

	public onAfterAffect( hookCommand:string, affectCommand:string ) {
		if ( ! this.onAfterEffectHooks[ hookCommand ] ) {
			this.onAfterEffectHooks[ hookCommand ] = [];
		}

		this.onAfterEffectHooks[ hookCommand ].push( affectCommand );
	}
}
