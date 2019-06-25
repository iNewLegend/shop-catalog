/**
 * @file: js/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */

import API from './api/api.js';
import API_Cart from './api/cart.js';
import API_Catalog from './api/catalog.js';

const debug = true;

export default class Cart {
    static reloadCartEachOpen = false; // highlight new cart item while this option set to true will not work.

    /**
     * Function constructor() : Create Cart
     * 
     * @param {API} api
     * @param {API_Catalog} apiCatalog 
     */
    constructor(api, apiCatalog) {
        this.cart = [];

        this.apiCart = new API_Cart(api);
        this.apiCatalog = apiCatalog;

        this.elements = {
            headerTogglerAmount: $('header #toggler .amount'),

            templateCartItem: $('template#cart-item'),

            cart: $('#cart'),
            cartEmpty: $('#cart #empty'),
            cartItems: $('#cart .items'),
            cartCheckout: $("#cart .checkout"),
            cartItemsTotal: $('#cart .items .total'),
            cartTotalPrice: $('#cart .total .price')
        };

        this.elements.cart.on('click', '.items .close', ((e) => this.onItemRemove(e)));
    }

    /**
     * Function initialize() : Initialize Cart
     */
    initialize() {
        if (debug) console.log(`${this.constructor.name}::initialize()`);

        this.get();
    }

    /**
     * Function get() : Get cart from server
     */
    get() {
        if (debug) console.log(`${this.constructor.name}::get()`);

        const { cartItems, headerTogglerAmount } = this.elements;

        // clear toggler amount
        headerTogglerAmount.html(0);

        // clear visual cart
        this.cart.items = [];
        this.cart.total = 0;

        // clear dom cart except .total
        if (cartItems.length > 0) {
            cartItems.find('.item').remove();
        }

        this.apiCart.get(this.onRecv.bind(this));
    }

    /**
     * Function getItemKeyById() : Get Item key from cart by id.
     * 
     * @param {number} id 
     */
    getItemKeyById(id) {
        if (debug) console.log(`${this.constructor.name}::getItemKeyById('${id}')`);

        let foundItemKey = null;

        for (let i in this.cart.items) {
            if (this.cart.items[i].id == id) {
                foundItemKey = i;
                break;
            }
        }

        return foundItemKey;
    }

    /**
     * Function onRecv() : Called when cart received
     * 
     * @param {[]} data 
     */
    onRecv(data) {
        if (debug) console.log(`${this.constructor.name}::onRecv('${JSON.stringify(data)}')`);

        // not all the products that are in cart exist localy since we used pages in that system,
        // so we findout what missing and request it from the server.
        const missingProducts = data.filter((item) => {
            // we get the price and name from local catalog;
            // there is many solutions, this is fine for that exmaple.
            const localProduct = this.apiCatalog.getLocalProductById(item.id);

            // use extra info from local product
            if (localProduct) {
                item.price = localProduct.price;
                item.name = localProduct.name;

                return false;
            }

            return true;
        });

        this.apiCatalog.getByIds((missing) => {
            data.map((item) => {
                Object.assign(item, missing.find(x => x.id == item.id));
                this.addItem(item, false);
            });

            // since we put false parameter in addItem, we need notify manually
            this.onChange();
        }, missingProducts.map(x => x.id));
    }

    
    /**
     * Function onChange() : Called when cart changed
     */
    onChange() {
        if (debug) console.log(`${this.constructor.name}::onChange()`);

        this.cart.total = 0;
        this.cart.items.forEach((item) => {
            this.cart.total += item.amount * item.price;
        });

        const { cartTotalPrice, headerTogglerAmount } = this.elements;

        // remove empty item slots from cart
        this.cart.items = this.cart.items.filter(function (el) {
            return el != null;
        });


        this.efficientEmptyState(Boolean(this.cart.items.length));

        // set the price
        cartTotalPrice.html(this.cart.total.toFixed(2));

        // set amount of products ONLY!!! to toggler
        headerTogglerAmount.html(this.cart.items.length);
    }

    /**
     * Function onOpen() : Called when cart open
     */
    onOpen() {
        if (debug) console.log(`${this.constructor.name}::onOpen()`);

        if (Cart.reloadCartEachOpen) {
            this.get();
        }
    }

    /**
     * Function onClose() : Called when cart close
     */
    onClose() {
        if (debug) console.log(`${this.constructor.name}::onClose()`);

        // clear highlight
        this.elements.cartItems.find('.item').css('animation', 'none');
    }

    /**
     * Function onItemAdd() : Called on item add 
     * 
     * @param {{}} product 
     * @param {function()} onSuccess
     */
    onItemAdd(product, onSuccess = null) {
        if (debug) {
            console.log(`${this.constructor.name}::onItemAdd() ->`);
            console.log(product);
        }

        this.apiCart.addItem((data) => {
            if (!data.error) {
                this.addItem(product, true, true);

                if (onSuccess) onSuccess();
            } else {
                alert(data.message);
            }
        }, product.id, product.amount);
    }

    /**
     * Function onItemRemove() : Called on item remove
     * 
     * @param {event} e 
     */
    onItemRemove(e) {
        if (debug) console.log(`${this.constructor.name}::onItemRemove()`);

        // maybe there is better way.
        const el = $(e.currentTarget);
        const item = el.parentsUntil('.item').parent();

        this.apiCart.removeItem((data) => {
            if (!data.error) {
                const item = data;

                this.removeItem(item, true);
            } else {
                alert(data.message);
            }
        }, parseInt(item.attr('data-id')));

    }

    /**
     * function insertItem() : Insert new item dom and virtual
     * 
     * @param {{}} item 
     */
    insertItem(item) {
        if (debug) {
            console.log(`${this.constructor.name}::insertItem() ->`);
            console.log(item);
        }

        const { templateCartItem, cartItems } = this.elements;

        // add to virtual cart
        this.cart.items.push(item);

        // get dom
        let templateHtml = templateCartItem.html();

        // format template
        templateHtml = templateHtml.replace('${id}', item.id);
        templateHtml = templateHtml.replace('${name}', item.name);
        templateHtml = templateHtml.replace('${price}', item.price);
        templateHtml = templateHtml.replace('${id}', item.id);
        templateHtml = templateHtml.replace('${amount}', item.amount);
        templateHtml = templateHtml.replace('${sum}', (item.amount * item.price).toFixed(2));

        // update dom
        cartItems.append($(templateHtml));
    }

    /**
     * Function updateItem() : Update Cart Item dom and virtual
     * 
     * @param {{}} item 
     * @param {*} key 
     * @param {$} domItem 
     */
    updateItem(item, key, domItem) {
        if (debug) {
            console.log(`${this.constructor.name}::updateItem() ->`);
            console.dir({ item, key, domItem });
        }

        // get virtual item cart
        const virtualItem = this.cart.items[key];

        // update virtual item amount
        virtualItem.amount += item.amount;

        // update virtual cart
        this.cart.items[key] = virtualItem;

        const domAmount = domItem.find('.amount');
        const domSum = domItem.find('.sum .value');

        // update dom
        domAmount.html(parseInt(virtualItem.amount));
        domSum.html((parseFloat((virtualItem.amount * item.price)).toFixed(2)));
    }

    /**
     * Function addItem() : Adds item to cart
     * 
     * @param {{}} item 
     * @param {boolean} notifyCartChanged 
     * @param {boolean} highlight 
     */
    addItem(item, notifyCartChanged = true, highlight = false) {
        if (debug) {
            console.log(`${this.constructor.name}::addItem() ->`);
            console.log({ item, notifyCartChanged, highlight });
        }

        const { cartItems } = this.elements;

        const foundItemKey = this.getItemKeyById(item.id);
        
        const getDomItem = () => cartItems.find(`.item[data-id='${item.id}']`);

        let domItem = getDomItem();

        if (foundItemKey) {
            this.updateItem(item, foundItemKey, domItem)
        } else {
            this.insertItem(item);
            // for highlight
            domItem = getDomItem();
        }

        if (highlight) {
            this.highlightItem(domItem);
        }

        if (notifyCartChanged) {
            this.onChange();

        }
    }

    /**
     * Function removeItem() : Remove's item from cart
     * 
     * @param {{}} item 
     * @param {boolean} notifyCartChanged 
     */
    removeItem(item, notifyCartChanged = true) {
        if (debug) {
            console.log(`${this.constructor.name}::removeItem() ->`);
            console.log({ item, notifyCartChanged });
        }

        const { cartItems } = this.elements;

        const foundProductKey = this.getItemKeyById(item.id);

        if (foundProductKey) {
            // update virtual cart
            delete this.cart.items[foundProductKey];

            // update dom cart
            cartItems.find(`.item[data-id='${item.id}']`).remove();

        } else {
            alert(`${this.constructor.name}::removeItem() -> item with id: '${item.id}' not found in cart.`);
        }

        if (notifyCartChanged) {
            this.onChange();
        }
    }

    /**
     * Function highlightItem() : highlight item in cart
     * 
     * @param {$} domItem 
     */
    highlightItem(domItem) {
        domItem.css('animation', 'highlight 3s');
    }

    /**
     * Function efficientEmptyState() : Update when cart have items or not.
     * 
     * @param {boolean} state 
     */
    efficientEmptyState(state) {
        if (debug) console.log(`${this.constructor.name}::efficientEmptyState('${state}')`);

        const {
            cartEmpty,
            cartCheckout,
            cartItemsTotal,
            headerTogglerAmount
        } = this.elements;

        if (state) {
            cartEmpty.hide();
            cartCheckout.addClass('open');
            cartItemsTotal.addClass('open');
            headerTogglerAmount.show();
        } else {
            cartEmpty.show();
            cartCheckout.removeClass('open');
            cartItemsTotal.removeClass('open');
            headerTogglerAmount.hide();
        }
    }
}
