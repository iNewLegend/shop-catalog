/**
 * @file: js/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */

import API from './api/api.js';

import Modules from './modules/modules.js';
import Services from './services/services.js';

export default class Cart {
    static reloadCartEachOpen = false; // highlight new cart item while this option set to true will not work.

    /**
     * Function constructor() : Create Cart
     * 
     * @param {API.Cart} cart
     * @param {API.Catalog} catalog 
     */
    constructor(cart, catalog) {
        this.logger = new Modules.Logger(this, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.cart = [];

        this.apiCart = cart;
        this.apiCatalog = catalog;

        this.elements = {
            header: {
                cart: $('header #toggler .cart'),
                amount: $('header #toggler .amount'),
                spinner: $('header #toggler .spinner')
            },

            cart: {
                self: $('#cart'),
                empty: $('#cart #empty'),
                items: $('#cart .items'),
                itemsTotal: $('#cart .items .total'),
                totalPrice: $('#cart .total .price'),
                checkout: $('#cart .checkout')
            },

            template: {
                cartItem: $('template#cart-item'),
            },
        };

        this.events = {
            onCheckout: () => { }
        }
    }

    /**
     * Function initialize() : Initialize Cart
     */
    initialize() {
        this.logger.startEmpty();

        const { cart } = this.elements;

        cart.self.on('click', '.items .close', ((e) => this._onItemRemove(e)));
        cart.checkout.click(this.events.onCheckout.bind(this));

        this._get();
    }

    /**
     * Function _onRecv() : Called when cart received
     * 
     * @param {[]} data 
     */
    _onRecv(data) {
        this.logger.object(data, 'data');

        const { cart, spinner } = this.elements.header;

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
                this._doAddItem(item, false);
            });

            // since we put false parameter in addItem, we need notify manually
            this._onChange();
        }, missingProducts.map(x => x.id));

        cart.show();
        spinner.hide();
    }


    /**
     * Function _onChange() : Called when cart changed
     */
    _onChange() {
        this.logger.startEmpty();

        this.cart.total = 0;
        this.cart.items.forEach((item) => {
            this.cart.total += item.amount * item.price;
        });

        const { cart, header } = this.elements;

        // remove empty item slots from cart
        this.cart.items = this.cart.items.filter(function (el) {
            return el != null;
        });

        this.efficientEmptyState(Boolean(this.cart.items.length));

        // set the price
        cart.totalPrice.html(this.cart.total.toFixed(2));

        // set amount of products ONLY!!! to toggler
        header.amount.html(this.cart.items.length);
    }

    /**
     * Function _onItemRemove() : Called on item remove
     * 
     * @param {event} e 
     */
    _onItemRemove(e) {
        this.logger.startWith({ e });

        // maybe there is better way.
        const el = $(e.currentTarget);
        const item = el.parentsUntil('.item').parent();

        this.apiCart.removeItem((data) => {
            if (!data.error) {
                const item = data;

                this._doRemoveItem(item, true);
            } else {
                alert(data.message);
            }
        }, parseInt(item.attr('data-id')));

    }

    /**
     * function _doInsertItem() : Insert new item dom and virtual
     * 
     * @param {{}} item 
     */
    _doInsertItem(item) {
        this.logger.startWith({ item });

        const { template, cart } = this.elements;

        // add to virtual cart
        this.cart.items.push(item);

        // get dom
        let templateHtml = template.cartItem.html();

        // format template
        templateHtml = templateHtml.replace('${id}', item.id);
        templateHtml = templateHtml.replace('${name}', item.name);
        templateHtml = templateHtml.replace('${price}', item.price);
        templateHtml = templateHtml.replace('${id}', item.id);
        templateHtml = templateHtml.replace('${amount}', item.amount);
        templateHtml = templateHtml.replace('${sum}', (item.amount * item.price).toFixed(2));

        // update dom
        cart.items.append($(templateHtml));
    }

    /**
     * Function _doUpdateItem() : Update Cart Item dom and virtual
     * 
     * @param {{}} item 
     * @param {*} key 
     * @param {$} domItem 
     */
    _doUpdateItem(item, key, domItem) {
        this.logger.startWith({ item, key, domItem });

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
     * Function _doAddItem() : Adds item to cart
     * 
     * @param {{}} item 
     * @param {boolean} notifyCartChanged 
     * @param {boolean} highlight 
     */
    _doAddItem(item, notifyCartChanged = true, highlight = false) {
        this.logger.startWith({ item, notifyCartChanged, highlight });

        const { cart } = this.elements;

        const foundItemKey = this._getItemKeyById(item.id);

        const getDomItem = () => cart.items.find(`.item[data-id='${item.id}']`);

        let domItem = getDomItem();

        if (foundItemKey) {
            this._doUpdateItem(item, foundItemKey, domItem)
        } else {
            this._doInsertItem(item);
            // for highlight
            domItem = getDomItem();
        }

        if (highlight) {
            this._doHighlightItem(domItem);
        }

        if (notifyCartChanged) {
            this._onChange();

        }
    }

    /**
     * Function _doRemoveItem() : Remove's item from cart
     * 
     * @param {{}} item 
     * @param {boolean} notifyCartChanged 
     */
    _doRemoveItem(item, notifyCartChanged = true) {
        this.logger.startWith({ item, notifyCartChanged });

        const { cart } = this.elements;

        const foundProductKey = this._getItemKeyById(item.id);

        if (foundProductKey) {
            // update virtual cart
            delete this.cart.items[foundProductKey];

            // update dom cart
            cart.items.find(`.item[data-id='${item.id}']`).remove();

        } else {
            alert(`${this.constructor.name}::removeItem() -> item with id: '${item.id}' not found in cart.`);
        }

        if (notifyCartChanged) {
            this._onChange();
        }
    }

    /**
     * Function _doHighlightItem() : highlight item in cart
     * 
     * @param {$} domItem 
     */
    _doHighlightItem(domItem) {
        this.logger.startWith({ domItem });

        domItem.css('animation', 'highlight 3s');
    }

    /**
     * Function get() : Get cart from server
     */
    _get() {
        this.logger.startEmpty();

        const { cart, header } = this.elements;

        header.spinner.show();

        // clear toggler amount
        header.amount.html(0);

        // clear visual cart
        this.cart.items = [];
        this.cart.total = 0;

        // clear dom cart except .total
        if (cart.items.length > 0) {
            cart.items.find('.item').remove();
        }

        this.apiCart.get(this._onRecv.bind(this));
    }

    /**
     * Function _getItemKeyById() : Get Item key from cart by id.
     * 
     * @param {number} id 
     */
    _getItemKeyById(id) {
        this.logger.startWith({ id });

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
     * Function on() : Delcare event callback
     * 
     * @param {'checkout'} event 
     * @param {{function()} } callback 
     */
    on(event, callback) {
        this.logger.startWith({ event, callback });

        switch (event) {
            case 'checkout': {
                this.events.onCheckout = callback;
            } break;

            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
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
     * Function close() : Close the cart
     */
    close() {
        this.logger.startEmpty();

        const { cart } = this.elements;

        // clear highlight
        cart.items.find('.item').css('animation', 'none');
    }

    /**
     * Function efficientEmptyState() : Update when cart have items or not.
     * 
     * @param {boolean} state 
     */
    efficientEmptyState(state) {
        this.logger.startWith({ state });

        const { cart, header } = this.elements;

        if (state) {
            cart.empty.hide();
            cart.checkout.addClass('open');
            cart.itemsTotal.addClass('open');
            header.amount.show();
        } else {
            cart.empty.show();
            cart.checkout.removeClass('open');
            cart.itemsTotal.removeClass('open');
            header.amount.hide();
        }
    }

    /**
     * Function itemAdd() : Add items or update
     * 
     * @param {{}} product 
     * @param {function()} onSuccess
     */
    itemAdd(product, onSuccess = null) {
        this.logger.startWith({ product, onSuccess });

        this.apiCart.addItem((data) => {
            if (!data.error) {
                this._doAddItem(product, true, true);

                if (onSuccess) onSuccess();
            } else {
                alert(data.message);
            }
        }, product.id, product.amount);
    }
}
