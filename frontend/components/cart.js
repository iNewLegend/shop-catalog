/**
 * @file: components/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */
import * as core from "CORE";
import * as services from 'SERVICES';

import { Component, Logger } from 'MODULES';
import Item from './cart/item';

import './cart.css';

/**
 * @memberOf components
 */
export class Cart extends Component {
	static openCartOnUpdate = true;
	static reloadCartEachOpen = false; // Highlight of new cart item, while this option set to true, will not work.

	/**
	 * Loaded items to be rendered.
	 *
	 * @type {Array.<components.cart.Item>}
	 */
	items = [];

	/**
	 * @inheritDoc
	 *
	 * @param {API.Cart} options.cart
	 * @param {API.Catalog} options.catalog
	 */
	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onCartRequest: () => {},
			onCartReceived: () => {},
			onAmountChange: ( amount ) => {},
			onStateEmpty: ( state ) => {},
			onCheckout: () => {}
		};
	}

	static getNamespace() {
		return 'Components'
	}

	static getName() {
		return 'Components/Cart';
	}

	initialize( options ) {
		this.logger = new Logger( Cart.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.items = [];

		this.apiCart = options.cart;
		this.apiCatalog = options.catalog;

		return super.initialize( options );
	}

	template() {
		return (`
	          <div class="cart">
                <h1 id="empty" style="text-align: center">Your cart is empty.</h1>

                <ul class="items">
                    <li class="total">
                        <h2>TOTAL</h2>
                        <h3>$<span class="price">0</span></h3>
                    </li>
                </ul>

                <button class="checkout bg-info" onclick="this.events.onCheckout()">CHECKOUT</button>
            </div>
	    `)
	}

	afterRender() {
		super.afterRender();

		this.logger.startEmpty();

		this.elements = {
			self: core.Factory.createElement( 'div.cart' ),
			empty: core.Factory.createElement( '.cart #empty' ),
			items: core.Factory.createElement( '.cart .items' ),
			itemsTotal: core.Factory.createElement( '.cart .items .total' ),
			totalPrice: core.Factory.createElement( '.cart .total .price' ),
			checkout: core.Factory.createElement( '.cart .checkout' )
		};

		this.request();
	}

	/**
	 * Function onChange() : Called when cart changed
	 */
	onChange() {
		this.logger.startEmpty();

		const { totalPrice } = this.elements;

		this.efficientEmptyState( Boolean( this.items.length ) );

		let totalPriceOfAllItems = 0;

		this.items.forEach( ( item ) => totalPriceOfAllItems += item.getTotal() )

		totalPrice.element.innerText = totalPriceOfAllItems.toFixed( 2 );

		this.events.onAmountChange( this.items.length );
	}

	/**
	 * Function onItemRemove() : Called on item remove
	 *
	 * @param {Item} item
	 */
	onItemRemove( item ) {
		this.logger.startWith( { e: item } );

		const itemId = item.id;

		this.apiCart.removeItem( ( data ) => {
			if ( ! data.error ) {
				const item = this.getItemKeyById( itemId );

				if ( item ) {
					this.doRemoveItem( item, true );
				} else {
					alert( `${this.constructor.name}::removeItem() -> item with id: '${item.id}' not found in cart.` );
				}

			} else {
				alert( data.message );
			}
		}, itemId );
	}

	/**
	 * Function request() : Request cart from server
	 */
	request() {
		this.logger.startEmpty();

		const { items } = this.elements;

		this.events.onCartRequest();

		// Clear toggle amount
		this.events.onAmountChange( 0 );

		// Clear visual cart.
		this.items = [];

		this.apiCart.get( this.receive.bind( this ) );
	}

	/**
	 * Function receive() : Called when cart received, (callback).
	 *
	 * @param {[]} data
	 */
	receive( data ) {
		this.logger.object( data, 'data' );

		// not all the products that are in cart exist locally since we used pages in that system,
		// so we find out what missing and request it from the server.
		const missingProducts = data.filter( ( item ) => {
			// we get the price and name from local catalog;
			// there is many solutions, this is fine for that example.
			const localProduct = this.apiCatalog.getLocalProductById( item.id );

			// use extra info from local product
			if ( localProduct ) {
				item.price = localProduct.price;
				item.name = localProduct.name;

				return false;
			}

			return true;
		} );

		this.apiCatalog.getByIds( ( missing ) => {
			data.map( ( item ) => {
				Object.assign( item, missing.find( x => x.id == item.id ) );
				item = this.createItem( item );
				this.doAddItem( item, false );
			} );

			// Since we put false parameter in addItem, we need notify manually.
			this.onChange();
		}, missingProducts.map( x => x.id ) );

		this.events.onCartReceived();
	}

	/**
	 * function doInsertItem() : Insert item.
	 *
	 * @param {components.cart.Item} item
	 */
	doInsertItem( item ) {
		this.logger.startWith( { item } );

		this.items.push( item );

		item.on( 'item:remove', this.onItemRemove.bind( this ) );
		item.render();
	}

	/**
	 * Function doUpdateItem() : Update item.
	 *
	 * @param {components.cart.Item} newItem
	 * @param {components.cart.Item} existItem
	 */
	doUpdateItem( newItem, existItem ) {
		this.logger.startWith( { newItem, existItem } );

		existItem.updateAmount( newItem.amount );
	}

	/**
	 * Function doAddItem() : Adds item to cart
	 *
	 * @param {components.cart.Item} item
	 * @param {boolean} notifyCartChanged
	 * @param {boolean} highlight
	 */
	doAddItem( item, notifyCartChanged = true, highlight = false ) {
		this.logger.startWith( { item, notifyCartChanged, highlight } );

		const existItem = this.getItemKeyById( item.id )

		existItem ?
			this.doUpdateItem( item, existItem ) :
			this.doInsertItem( item );

		if ( highlight ) {
			(existItem || item).highlightItem();
		}

		if ( notifyCartChanged ) {
			this.onChange();
		}
	}

	/**
	 * Function doRemoveItem() : Remove's item from cart
	 *
	 * @param {components.cart.Item} item
	 * @param {boolean} notifyCartChanged
	 */
	doRemoveItem( item, notifyCartChanged = true ) {
		this.logger.startWith( { item, notifyCartChanged } );

		// Remove cart.
		this.items = this.items.filter( ( filteredItem ) => filteredItem !== item );

		// Remove from dom.
		item.remove();

		if ( notifyCartChanged ) {
			this.onChange();
		}
	}

	/**
	 * Function itemAdd() : Add items or update
	 *
	 * @param {Object} productData
	 * @param {{function()}} onSuccess
	 */
	itemAdd( productData, onSuccess = null ) {
		this.logger.startWith( { product: productData, onSuccess } );

		this.apiCart.addItem( ( data ) => {
			if ( ! data.error ) {
				this.doAddItem(
					this.createItem( productData ),
					true,
					true
				);

				if ( onSuccess ) onSuccess();
			} else {
				alert( data.message );
			}
		}, productData.id, productData.amount );
	}

	/**
	 * Function createItem() : Create new item.
	 *
	 * @param {Object} data
	 *
	 * @returns {components.cart.Item}
	 */
	createItem( data ) {
		const { logger } = this;

		logger.startWith( { data } );

		data.id = parseInt( data.id );

		return new Item( this.elements.items, { ... data, logger } );
	}

	/**
	 * Function getItemKeyById() : Get Item key from cart by id.
	 *
	 * @param {number} id
	 *
	 * @returns {components.cart.Item}
	 */
	getItemKeyById( id ) {
		this.logger.startWith( { id } );

		return this.items.find( ( item ) => item.id === id );
	}

	/**
	 * Function open() :  Open the cart
	 */
	open() {
		this.logger.startEmpty();

		if ( Cart.reloadCartEachOpen ) {
			this.request();
		}
	}

	/**
	 * Function close() : close the cart
	 */
	close() {
		this.logger.startEmpty();

		const { items } = this.elements;

		// Clear highlight.
		this.items.forEach( ( item ) => {
			item.view.element.element.style = 'animation: none';
		} );
	}

	/**
	 * Function efficientEmptyState() : Update when cart have items or not.
	 *
	 * @param {boolean} state
	 */
	efficientEmptyState( state ) {
		this.logger.startWith( { state } );

		const { empty, checkout, itemsTotal } = this.elements;

		if ( state ) {
			empty.hide();

			checkout.addClass( 'open' );
			itemsTotal.addClass( 'open' );
		} else {
			empty.show();

			checkout.removeClass( 'open' );
			itemsTotal.removeClass( 'open' );
		}

		this.events.onStateEmpty( state );
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'ui:checkout'|'cart:request'|'cart:received'|'amount:change'|'state:empty'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'ui:checkout':
				return this.events.onCheckout = callback;

			case 'cart:request':
				return this.events.onCartRequest = callback;

			case 'cart:received':
				return this.events.onCartReceived = callback;

			case 'amount:change':
				return this.events.onAmountChange = callback;

			case 'state:empty':
				return this.events.onStateEmpty = callback;
		}

		return super.on( event, callback );
	}
}

export default Cart;
