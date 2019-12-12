import BaseElement from './base-element';

export class Component extends BaseElement {
    initialize() {
        this.beforeInit();

        super.initialize();

        this.afterInit();
    }

    beforeInit() {}
    afterInit() {}

    afterRender() {
        super.afterRender();

        this.attachListeners();
    }

    attachListeners() {
        Object.getOwnPropertyNames(this).forEach( ( method ) => {
            if ( method.includes('on') ) {
                switch( method ) {
                    case 'onClick': {
                        this.element.addEventListener( 'click', this['onClick'] );
                    }
                    break;
                }
            }
        } );
    }
}

export default Component;
