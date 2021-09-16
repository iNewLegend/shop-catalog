import "@babel/polyfill"

// TODO Fix & sort by abc.
import Container from "CORE/container";
import { default as LoggerModule } from './modules/logger';
import { Commands } from './commands';
import { Component } from './component';
import Controllers from "./controllers";
import { Data } from './data';
import { Internal } from './internal';
import { Element } from './element';
import { Factory } from './factory';
import { Model } from './model';
import { default as JsxElement } from './jsx-element'

export { Core } from './base/core';
export { Context } from './context';
export { View } from './view';

if ( ! global.$core ) {
	global.$core = {
		Component,
		Container,

		Element,
		JsxElement,

		Factory,

		commands: new Commands(),
		controllers: new Controllers(),
		data: new Data(),
		internal: new Internal(),

		Model,

		modules: {
			Logger: LoggerModule,
		}
	}
}

// TODO: sort by abc.
export { Commands, Component, Container, Element, Factory, Model };
