
export { Core } from './base/core';
import { default as LoggerModule } from './modules/logger';
import { Commands } from './commands';
import { Component } from './component';
export { Container } from './container';
export { Context } from './context';
import Controllers from "./controllers";
import { Data } from './data';
import { Element } from './element';
import { Factory } from './factory';
import { Model } from './model';
export { View } from './view';

if  ( ! global.$core ) {
	global.$core = {
		Component,

		Element,
		Factory,

		commands: new Commands(),
		controllers: new Controllers(),
		data: new Data(),

		Model,

		modules: {
			Logger: LoggerModule,
	}
}
}

// TODO: sort by abc.
export { Commands, Component, Element, Factory, Model};
