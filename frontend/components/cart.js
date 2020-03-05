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
    static reloadCartEachOpen = false; // highlight of new cart item, while this option set to true, will not work.

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
            onGet: () => { },
            onReceived: () => { },
            onAmountChange: (amount) => { },
            onEmptyState: (state) => { },
            onCheckout: () => { }
        };

        this._afterRender = () => {
            this.elements = {
                self: document.querySelector('div.cart'),
                empty: document.querySelector('.cart #empty'),
                items: document.querySelector('.cart .items'),
                itemsTotal: document.querySelector('.cart .items .total'),
                totalPrice: document.querySelector('.cart .total .price'),
                checkout: document.querySelector('.cart .checkout')
            };

            this._initialize();
        }
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Cart';
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

        this._get();
    }

    /**
     * Function _onRecv() : Called when cart received
     *
     * @param {[]} data
     */
    _onRecv( data ) {
        this.logger.object( data, 'data' );

        // not all the products that are in cart exist localy since we used pages in that system,
        // so we findout what missing and request it from the server.
        const missingProducts = data.filter( ( item ) => {
            // we get the price and name from local catalog;
            // there is many solutions, this is fine for that exmaple.
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
                this._doAddItem( item, false );
            } );

            // since we put false parameter in addItem, we need notify manually
            this._onChange();
        }, missingProducts.map( x => x.id ) );

        this.events.onReceived();
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

        // remove empty item slots from cart
        this.cart.items = this.cart.items.filter( function( el ) {
            return el != null;
        } );

        this.efficientEmptyState( Boolean( this.cart.items.length ) );

        // set the price
        totalPrice.innerHTML = this.cart.total.toFixed( 2 );

        // set amount of products type
        this.events.onAmountChange( this.cart.items.length );
    }

    /**
     * Function _onItemRemove() : Called on item remove
     *
     * @param {Event} e
     */
    _onItemRemove( e ) {
        this.logger.startWith( { e } );

        // maybe there is better way.
        const itemId = parseInt( e.target.closest( '.item' ).getAttribute( 'data-id' ) );

        this.apiCart.removeItem( ( data ) => {
            if ( !data.error ) {
                const item = data;

                this._doRemoveItem( item, true );
            } else {
                alert( data.message );
            }
        }, itemId );
    }

    /**
     * function _doInsertItem() : Insert new item dom and virtual
     *
     * @param {{}} item
     */
    _doInsertItem( item ) {
        this.logger.startWith( { item } );

        const { items } = this.elements;

        // add to virtual cart
        this.cart.items.push( item );

        // update dom
        this.renderItem( item, items );
    }

    /**
     * Function _doUpdateItem() : Update Cart Item dom and virtual
     *
     * @param {{}} item
     * @param {string} key
     * @param {Element} domItem
     */
    _doUpdateItem( item, key, domItem ) {
        this.logger.startWith( { item, key, domItem } );

        // get virtual item cart
        const virtualItem = this.cart.items[ key ];

        // update virtual item amount
        virtualItem.amount += item.amount;

        // update virtual cart
        this.cart.items[ key ] = virtualItem;

        const domAmount = domItem.querySelector( '.amount' );
        const domSum = domItem.querySelector( '.sum .value' );

        // update dom
        domAmount.innerHTML = parseInt( virtualItem.amount );
        domSum.innerHTML = (parseFloat( (virtualItem.amount * item.price) ).toFixed( 2 ));
    }

    /**
     * Function _doAddItem() : Adds item to cart
     *
     * @param {{}} item
     * @param {boolean} notifyCartChanged
     * @param {boolean} highlight
     */
    _doAddItem( item, notifyCartChanged = true, highlight = false ) {
        this.logger.startWith( { item, notifyCartChanged, highlight } );

        const { items } = this.elements;

        const foundItemKey = this._getItemKeyById( item.id );

        const getDomItem = () => items.querySelector( `.item[data-id='${item.id}']` );

        let domItem = getDomItem();

        if ( foundItemKey ) {
            this._doUpdateItem( item, foundItemKey, domItem )
        } else {
            this._doInsertItem( item );
            // for highlight
            domItem = getDomItem();
        }

        if ( highlight ) {
            this._doHighlightItem( domItem );
        }

        if ( notifyCartChanged ) {
            this._onChange();

        }
    }

    /**
     * Function _doRemoveItem() : Remove's item from cart
     *
     * @param {{}} item
     * @param {boolean} notifyCartChanged
     */
    _doRemoveItem( item, notifyCartChanged = true ) {
        this.logger.startWith( { item, notifyCartChanged } );

        const { items } = this.elements;

        const foundProductKey = this._getItemKeyById( item.id );

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
     * Function _doHighlightItem() : highlight item in cart
     *
     * @param {Element} domItem
     */
    _doHighlightItem( domItem ) {
        this.logger.startWith( { domItem } );

        domItem.style = 'animation: highlight 3s';
    }

    /**
     * Function get() : Get cart from server
     */
    _get() {
        this.logger.startEmpty();

        const { items } = this.elements;

        this.events.onGet();

        // clear toggle amount
        this.events.onAmountChange( 0 );

        // clear visual cart
        this.cart.items = [];
        this.cart.total = 0;

        // clear dom cart except .total
        if ( items.length > 0 ) {
            items.querySelector( '.item' ).remove();
        }

        this.apiCart.get( this._onRecv.bind( this ) );
    }

    /**
     * Function _getItemKeyById() : Get Item key from cart by id.
     *
     * @param {number} id
     */
    _getItemKeyById( id ) {
        this.logger.startWith( { id } );

        let foundItemKey = null;

        for ( let i in this.cart.items ) {
            if ( this.cart.items[ i ].id == id ) {
                foundItemKey = i;
                break;
            }
        }

        return foundItemKey;
    }

    /**
     * Function on() : Delcare event callback
     *
     * @param {'get'|'received'|'amountChange'|'emptyState'|'checkout'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        switch ( event ) {
            case 'get': {
                this.events.onGet = callback;
            } break;

            case 'received': {
                this.events.onReceived = callback;
            } break;

            case 'amountChange': {
                this.events.onAmountChange = callback;
            } break;

            case 'emptyState': {
                this.events.onEmptyState = callback;
            } break;

            case 'checkout': {
                this.events.onCheckout = callback;
            } break;

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

        if (Cart.reloadCartEachOpen) {
            this._get();
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

        this.events.onEmptyState( state );
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
            if ( !data.error ) {
                this._doAddItem( product, true, true );

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
        const { id, name, amount, price } = item;
        const sum = (amount * price).toFixed( 2 );

        parent.insertAdjacentHTML( 'beforeend', (`
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
        `) );
    }

    /**
     * Function render() : Add component markup to parent innerHTML
     *
     * @param {Element} parent
     */
    render( parent ) {
        parent.insertAdjacentHTML( 'beforeend', (`
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
        `) );

        this._afterRender();
    }
}

export default Cart;
