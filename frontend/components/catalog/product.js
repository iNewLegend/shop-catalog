/**
 * @file: components/catalog/product.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit.
 */
import * as services from 'SERVICES';
import {
	Component,
//	Logger,
} from 'MODULES';

/**
 * @memberOf components
 */
export class Product extends Component {
	constructor( parent, options ) {
		super( parent, options );

		// this.logger = new Logger( Product.getName(), true );
		// this.logger.setOutputHandler( services.Terminal.onOutput );
		//
		// this.logger.startWith( { options } );

		this.apiCatalog = options.api.catalog;

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
		// this.logger.startWith( { amount } );

		this.elements.amount.value = amount;
	}

	onProductAdd( e ) {
		// this.logger.startWith( { e } );
		const id = parseInt( this.view.element.element.getAttribute( 'data-id' ) ),
			amount = parseInt( this.elements.amount.value );

		let product = this.apiCatalog.getLocalProductById( id );

		// Assign `id` and `amount`.
		Object.assign( product, { id, amount } );

		// Call callback
		this.events.onProductAdd( product );

		// Put it back to 1.
        this.setAmount( 1 );
	}

	onProductChange( e ) {
		// this.logger.startWith( { e } );
		const val = e.currentTarget.value;

		// this.logger.debug( `val: '${val}'` );

		this.events.onProductChange( this, parseInt( val ) );
	}

	template() {
		const { id, name, price } = this.options;

		return (`
            <div class="product" data-id="${id}">
                <img src="img/product-${id}.jpg">
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
		// this.logger.startWith( { event, callback } );

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
