/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all commands instances, part of MVC, and managed by Controller.
 * @propose: Add extra logic/typing to CommandBase.
 */
import CommandBase from './command-base';
import Controller from '../controller';

export class CommandPublic extends CommandBase {
    public static controller: Controller

    static getName() {
        return 'Flow/CommandBases/CommandPublic';
    }

    getController(): Controller {
        // @ts-ignore
        return this.constructor.controller;
    }
}

export default CommandPublic;
