/**
 * @file: components/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */

import * as services from 'SERVICES';
import * as modules from 'MODULES';

/**
 * @memberOf components
 */
export class Cart {
	static openCartOnUpdate = true;

	/**
	 * Highlight of new cart item, while this option set to true, will not work.
	 *
	 * @type {boolean}
	 */
	static reloadCartEachOpen = false;

	static getNamespace() {
		return 'Components'
	}

	static getName() {
		return 'Components/Cart';
	}

	/**
	 * Function constructor() : Create Cart
	 *
	 * @param {API.Cart} cart
	 * @param {API.Catalog} catalog
	 */
	constructor( cart, catalog ) {
		this.logger = new modules.Logger( Cart.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.cart = [];

		this.apiCart = cart;
		this.apiCatalog = catalog;

		this.events = {
			onCartRequest: () => {},
			onCartReceived: () => {},
			onAmountChange: ( amount ) => {},
			onStateEmpty: ( state ) => {},
			onCheckout: () => {}
		};

		this._afterRender = () => {
			this.elements = {
				self: document.querySelector( 'div.cart' ),
				empty: document.querySelector( '.cart #empty' ),
				items: document.querySelector( '.cart .items' ),
				itemsTotal: document.querySelector( '.cart .items .total' ),
				totalPrice: document.querySelector( '.cart .total .price' ),
				checkout: document.querySelector( '.cart .checkout' )
			};

			this._initialize();
		}
	}

	/**
	 * Function _initialize() : Initialize Cart
	 */
	_initialize() {
		this.logger.startEmpty();

		this.elements.self.addEventListener( 'click', ( e ) => {
			e.preventDefault();

			if ( e.target.matches( '.close' ) ) {
				this._onItemRemove( e );
			} else if ( e.target.matches( '.checkout' ) ) {
				this.events.onCheckout();
			}
		} );

		this.request();
	}

	/**
	 * Function request() : Request cart from server
	 */
	request() {
		this.logger.startEmpty();

		const { items } = this.elements;

		this.events.onCartRequest();

		// Clear toggle amount.
		this.events.onAmountChange( 0 );

		// Clear visual cart.
		this.cart.items = [];
		this.cart.total = 0;

		// Clear dom cart except total.
		if ( items.length > 0 ) {
			items.querySelector( '.item' ).remove();
		}

		this.apiCart.get( this.receive.bind( this ) );
	}

	/**
	 * Function receive() : Called when cart received, (callback).
	 *
	 * @param {[]} data
	 */
	receive( data ) {
		this.logger.object( data, 'data' );

		/**
		 * Not all the products that are in cart exist locally since we
		 * used pages in that system so we find out what missing and request it from the server.
		 */
		const missingProducts = data.filter( ( item ) => {
			// We get the price and name from local catalog;
			// There is many solutions, this is fine for that example.
			const localProduct = this.apiCatalog.getLocalProductById( parseInt( item.id ) );

			// Use extra info from local product.
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
				this.doAddItem( item, false );
			} );

			// Since we put false parameter in addItem, we need notify manually.
			this._onChange();
		}, missingProducts.map( x => x.id ) );

		this.events.onCartReceived();
	}

	/**
	 * Function _onChange() : Called when cart changed
	 */
	_onChange() {
		this.logger.startEmpty();

		this.cart.total = 0;
		this.cart.items.forEach( ( item ) => {
			this.cart.total += item.amount * item.price;
		} );

		const { totalPrice } = this.elements;

		// Remove empty item slots from cart.
		this.cart.items = this.cart.items.filter( function( el ) {
			return el != null;
		} );

		this.efficientEmptyState( Boolean( this.cart.items.length ) );

		// Set the price.
		totalPrice.innerHTML = this.cart.total.toFixed( 2 );

		// Set amount of products type.
		this.events.onAmountChange( this.cart.items.length );
	}

	/**
	 * Function _onItemRemove() : Called on item remove
	 *
	 * @param {Event} e
	 */
	_onItemRemove( e ) {
		this.logger.startWith( { e } );

		// TODO: Find better solution.
		const itemId = parseInt( e.target.closest( '.item' ).getAttribute( 'data-id' ) );

		this.apiCart.removeItem( ( data ) => {
			if ( ! data.error ) {
				this.doRemoveItem( data, true );
			} else {
				alert( data.message );
			}
		}, itemId );
	}

	/**
	 * function doInsertItem() : Insert new item dom and virtual
	 *
	 * @param {{}} item
	 */
	doInsertItem( item ) {
		this.logger.startWith( { item } );

		const { items } = this.elements;

		// Add to virtual cart.
		this.cart.items.push( item );

		// Update dom.
		this.renderItem( item, items );
	}

	/**
	 * Function doUpdateItem() : Update Cart Item dom and virtual
	 *
	 * @param {{}} item
	 * @param {string} key
	 * @param {Element} domItem
	 */
	doUpdateItem( item, key, domItem ) {
		this.logger.startWith( { item, key, domItem } );

		// Get virtual item cart.
		const virtualItem = this.cart.items[ key ];

		// Update virtual item amount.
		virtualItem.amount += item.amount;

		// Update virtual cart.
		this.cart.items[ key ] = virtualItem;

		const domAmount = domItem.querySelector( '.amount' );
		const domSum = domItem.querySelector( '.sum .value' );

		// Update dom.
		domAmount.innerHTML = virtualItem.amount;
		domSum.innerHTML = ( parseFloat( ( virtualItem.amount * item.price ).toString() ).toFixed( 2 ) );
	}

	/**
	 * Function doAddItem() : Adds item to cart
	 *
	 * @param {{}} item
	 * @param {boolean} notifyCartChanged
	 * @param {boolean} highlight
	 */
	doAddItem( item, notifyCartChanged = true, highlight = false ) {
		this.logger.startWith( { item, notifyCartChanged, highlight } );

		const { items } = this.elements,
			foundItemKey = this.getItemKeyById( item.id ),
			getDomItem = () => items.querySelector( `.item[data-id='${item.id}']` );

		let domItem = getDomItem();

		if ( foundItemKey ) {
			this.doUpdateItem( item, foundItemKey.toString(), domItem )
		} else {
			this.doInsertItem( item );
			// for highlight
			domItem = getDomItem();
		}

		if ( highlight ) {
			this.doHighlightItem( domItem );
		}

		if ( notifyCartChanged ) {
			this._onChange();

		}
	}

	/**
	 * Function doRemoveItem() : Remove's item from cart
	 *
	 * @param {{}} item
	 * @param {boolean} notifyCartChanged
	 */
	doRemoveItem( item, notifyCartChanged = true ) {
		this.logger.startWith( { item, notifyCartChanged } );

		const { items } = this.elements,
			foundProductKey = this.getItemKeyById( item.id );

		if ( foundProductKey ) {
			// update virtual cart
			delete this.cart.items[ foundProductKey ];

			// update dom cart
			items.querySelector( `.item[data-id='${item.id}']` ).remove();

		} else {
			alert( `${this.constructor.name}::removeItem() -> item with id: '${item.id}' not found in cart.` );
		}

		if ( notifyCartChanged ) {
			this._onChange();
		}
	}

	/**
	 * Function doHighlightItem() : highlight item in cart
	 *
	 * @param {Element} domItem
	 */
	doHighlightItem( domItem ) {
		this.logger.startWith( { domItem } );

		domItem.style = 'animation: highlight 3s';
	}

	/**
	 * Function getItemKeyById() : Get Item key from cart by id.
	 *
	 * @param {number} id
	 */
	getItemKeyById( id ) {
		this.logger.startWith( { id } );

		return this.cart.items.find(
			( item => id === parseInt( item.id )
		) ) || null;
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
			case 'ui:checkout': {
				this.events.onCheckout = callback;
			}
				break;

			case 'cart:request': {
				this.events.onCartRequest = callback;
			}
				break;

			case 'cart:received': {
				this.events.onCartReceived = callback;
			}
				break;

			case 'amount:change': {
				this.events.onAmountChange = callback;
			}
				break;

			case 'state:empty': {
				this.events.onStateEmpty = callback;
			}
				break;

			default: {
				alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
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

		// clear highlight
		items.querySelectorAll( '.item' ).forEach( element => {
			element.style = 'animation: none';
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
			empty.style.display = 'none';

			checkout.classList.add( 'open' );
			itemsTotal.classList.add( 'open' );
		} else {
			empty.style.display = 'inherit';

			checkout.classList.remove( 'open' );
			itemsTotal.classList.remove( 'open' );
		}

		this.events.onStateEmpty( state );
	}

	/**
	 * Function itemAdd() : Add items or update
	 *
	 * @param {{}} product
	 * @param {{function()}} onSuccess
	 */
	itemAdd( product, onSuccess = null ) {
		this.logger.startWith( { product, onSuccess } );

		this.apiCart.addItem( ( data ) => {
			if ( ! data.error ) {
				this.doAddItem( product, true, true );

				if ( onSuccess ) onSuccess();
			} else {
				alert( data.message );
			}
		}, product.id, product.amount );
	}

	/**
	 * Function renderItem() : Return html markup for item
	 *
	 * @param {{}} item
	 * @param {Element} parent
	 */
	renderItem( item, parent ) {
		const { id, name, amount, price } = item,
			sum = (amount * price).toFixed( 2 );

		parent.insertAdjacentHTML( 'beforeend',
`
        <li class="item" data-id="${id}">
            <div class="thumbnail"><img src="img/product-${id}.jpg"></div>
            <div class="info">
                <h2>${name}</h2>
                <button class="color-primary close">&times;</button>
                <div class="amount-price">
                    <span class="amount">${amount}</span> x <strong>${price}</strong>
                    <p class="sum">$<span class="value">${sum}</span></p>
                </div>
            </div>
            <div class="clearfix"></div>
        </li>
`
		);
	}

	/**
	 * Function render() : Add component markup to parent innerHTML
	 *
	 * @param {Element} parent
	 */
	render( parent ) {
		parent.insertAdjacentHTML( 'beforeend',
`
        <div class="cart">
            <h1 id="empty" style="text-align: center">Your cart is empty.</h1>

            <ul class="items">
                <li class="total">
                    <h2>TOTAL</h2>
                    <h3>$<span class="price">0</span></h3>
                </li>
            </ul>

            <button class="checkout bg-info">CHECKOUT</button>
        </div>
`
		);

		this._afterRender();
	}
}

export default Cart;
