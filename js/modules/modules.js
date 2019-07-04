/**
 * @file: js/modules/modules.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import Logger from './logger.js';
import Page from './page.js';

var Modules = {};

Modules.Logger = Logger;
Modules.Page = Page;

export default Modules;

export { Logger, Page };