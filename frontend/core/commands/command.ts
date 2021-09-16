/**
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
    public static controller: Controller

    getName() {
        // @ts-ignore
        return super.getName();
    }

    getController(): Controller {
        // @ts-ignore
        return this.constructor.controller;
    }
}

export default Command;
