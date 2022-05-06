import "@babel/polyfill"

// TODO Fix & sort by abc.
import { Commands } from './commands';
import Controllers from "./controllers";
import { Data } from './data';
import { Internal } from './internal';
import { Factory } from './factory';
import { Model } from './model';
import { View } from './view';

import * as modules from './modules/'
import * as elements from './modules/elements/'
import Controller from "./controller";

if ( ! global.$flow ) {
	/**
	 * @name @flow
	 * */
	global.$flow = {
		// Part of core.
		commands: new Commands(),
		controllers: new Controllers(),
		data: new Data(),
		internal: new Internal(),

		// Part of core.
		Controller,
		Factory,
		Model,
		View,

		elements,
		modules,
	}
}

// TODO: sort by abc.
export { Commands, Factory, Model, View };
