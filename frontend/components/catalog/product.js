/**
 * @file: components/catalog/product.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit.
 */
import * as services from 'SERVICES';
import {
	Component,
	Logger,
} from 'MODULES';

/**
 * @memberOf components
 */
export class Product extends Component {
	constructor( parent, options ) {
		super( parent, options );

		this.logger = new Logger( Product.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startWith( { options } );

		this.apiCatalog = options.api.catalog;

		this.events = {
			onProductAdd: ( product ) => {},
		};

		this.afterRender = () => {
			super.afterRender();

			this.elements = {
				self: this.view.element,
				prev: $( "#pagination .prev" ),
				next: $( "#pagination .next" ),
				placeHolder: $( '#pagination .placeholder' )
			};

			this._initialize();
		}
	}

	static getNamespace() {
		return 'Components/Catalog'
	}

	static getName() {
		return 'Components/Catalog/Product';
	}

	/**
	 * Function _initialize() : Initialize Product
	 */
	_initialize() {
		this.logger.startEmpty();
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'product:add'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'product:add': {
				this.events.onProductAdd = callback;
			}
			break;

			default: {
				alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
	}

	onProductAdd( e ) {
		this.logger.startWith( { e } );

		// maybe there is better way.
		const el = $( e.currentTarget );
		const domProduct = el.parentsUntil( '.product' ).parent();

		const id = parseInt( domProduct.attr( 'data-id' ) );
		const amount = parseInt( domProduct.find( '.amount' ).val() );

		let product = this.apiCatalog.getLocalProductById( id );

		Object.assign( product, { id, amount } );

		// call callback
		this.events.onProductAdd( product );

		// put it back to 1.
		domProduct.find( '.amount' ).val( '1' );
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
                        <button class="bg-primary" onclick="this.onProductAdd()">Add To Cart</button>
                        <input class="amount" type="number" name="amount"
                            value="1" min="1">
                    </div>
                </div>
            </div>
        `);
	}
}

export default Product;
