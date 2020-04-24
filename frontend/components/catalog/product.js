/**
 * @file: components/catalog/product.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit.
 */
import { Component } from 'MODULES';
import './product.css';

/**
 * @memberOf components
 */
export class Product extends Component {
    constructor( parent, options ) {
        super( parent, options );

        /**
         * @type {modules.Logger}
         */
        this.logger = options.logger;

        // If parent logger 'Components/Catalog' passed, clone and extend its name.
        if ( this.logger ) {
            const { id, name, price } = this.options;

            this.logger = this.logger.clone();
            this.logger.name = Product.getName() + '/' + id;

            this.logger.startWith( { id, name, price } );
        }

        this.apis = {
            catalog: options.api.catalog,
        }

        this.events = {
            onProductAdd: ( product ) => {},
            onProductChange: ( product, amount ) => {},
        };

        // After render.
        this.afterRender = () => {
            super.afterRender();

            this.elements = {
                amount: this.view.element.element.querySelector( '.amount' ),
            }
        };
    }

    static getNamespace() {
        return 'Components/Catalog'
    }

    static getName() {
        return 'Components/Catalog/Product';
    }

    setAmount( amount ) {
        if ( this.logger ) {
            this.logger.startWith( { amount } );
        }

        this.elements.amount.value = amount;
    }

    onProductAdd( e ) {
        if ( this.logger ) {
            this.logger.startWith( { e } );
        }

        const id = parseInt( this.options.id ),
            amount = parseInt( this.elements.amount.value );

        let product = this.apis.catalog.getLocalProductById( id );

        // Assign `id` and `amount`.
        product = Object.assign( {}, product, { id, amount } );

        // Call callback
        this.events.onProductAdd( product );

        // Put it back to 1.
        this.setAmount( 1 );
    }

    onProductChange( e ) {
        if ( this.logger ) {
            this.logger.startWith( { e } );
        }

        const val = e.currentTarget.value;

        if ( this.logger ) {
            this.logger.debug( `val: '${val}'` );
        }

        this.events.onProductChange( this, parseInt( val ) );
    }

    template() {
        const { id, name, price } = this.options;

        return (`
            <div class="product">
                <img src="img/product-${id}.jpg" alt="product-${id}" />
                <h4 class="name color-secondary">${name}</h4>

                <div class="footer">
                    <h5>Price: <span class="price">${price}$</span></h5>
                    <div class="row">
                        <button onclick="this.onProductAdd()" class="bg-primary">Add To Cart</button>
                        <input onchange="this.onProductChange()" class="amount" type="number" name="amount"
                            value="1" min="1">
                    </div>
                </div>
            </div>
        `);
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'product:add'|'product:change'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        switch ( event ) {
            case 'product:add': {
                this.events.onProductAdd = callback;
            }
                break;

            case 'product:change': {
                this.events.onProductChange = callback;
            }
                break;

            default: {
                alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
            }
        }
    }
}

export default Product;
