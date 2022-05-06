/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging internal commands.
 * @propose: To serve commands that are not triggered by user.
 */
import { Commands } from "./commands";

export class Internal extends Commands {
    static getName() {
        return 'Core/Internal';
    }
}

export default Internal;
