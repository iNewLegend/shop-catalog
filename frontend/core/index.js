import Controllers from "CORE/controllers";

export { Core } from './base/core';
import { Commands } from './commands';
import { Component } from './component';
export { Container } from './container';
export { Context } from './context';
import { Element } from './element';
import { Factory } from './factory';
export { Model } from './model';
export { View } from './view';

if  ( ! global.$core ) {
	global.$core = {
		Component,

		Element,
		Factory,

		commands: new Commands(),
		controllers: new Controllers(),
	}
}

export { Commands, Component, Element, Factory, };
