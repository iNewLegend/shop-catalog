import "@babel/polyfill"

import * as commandBases from './command-bases/'
import * as errors from './errors/'
import * as managers from './managers/'
import * as modules from './modules/'

import { Component } from './component'
import { Container } from './container'
import { Context } from './context'
import { Controller } from "./controller";
import { Element } from "./element";
import { Factory } from './factory';
import { JsxElement } from './jsx-element';
import { Model } from './model';
import { View } from './view';

if ( ! global[ "$flow" ] ) {
	/**
	 * @name $flow
	 * */
	global.$flow = {
		commandBases,
		errors,
		managers,
		modules,

		Component,
		Container,
		Context,
		Controller,
		Element,
		Factory,
		JsxElement,
		Model,
		View,
	}
}

