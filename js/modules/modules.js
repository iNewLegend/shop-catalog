/**
 * @file: js/modules/modules.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import Logger from './logger.js';
import Page from './page.js';
import PageContainer from './page-container.js';

const Modules = {};

Modules.Logger = Logger;
Modules.Page = Page;
Modules.PageContainer = PageContainer;

export default Modules;

export { Logger, Page, PageContainer };