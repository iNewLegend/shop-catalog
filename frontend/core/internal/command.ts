/**
 * @file: core/internal/command.ts
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class for all internal commands, part of MVC, and managed by Controller.
 */
import CommandPublic from '../commands/command';

/**
 * @memberOf core.internal
 */
export class Command extends CommandPublic {

    static getName() {
        return 'Core/Internal/Command';
    }
}

export default Command;
