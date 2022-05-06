/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all internal commands, part of MVC, and managed by Controller.
 */
import CommandPublic from './command';

/**
 * @name $flow.modules.CommandInternal
 */
export class CommandInternal extends CommandPublic {

    static getName() {
        return 'Core/Internal/Command';
    }
}

export default CommandInternal;
