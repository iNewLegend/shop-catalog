/**
 * @file: core/commands/command.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all commands instances, part of MVC, and managed by Controller.
 * @propose: Add extra logic/typing to CommandBase.
 */
import CommandBase from './base';
import Controller from "../controllers/controller";

/**
 * @memberOf core.commands
 */
export class Command extends CommandBase {
    public controller: Controller
}

export default Command;
