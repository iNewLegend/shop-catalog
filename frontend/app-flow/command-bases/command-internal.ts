/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all internal commands, part of MVC, and managed by Controller.
 */
import CommandPublic from './command-public';

export class CommandInternal extends CommandPublic {

    static getName() {
        return 'Flow/CommandBases/CommandInternal';
    }
}

export default CommandInternal;
