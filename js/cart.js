/**
 * @file: js/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */

import API_Cart from './api/cart.js';
import API_Catalog from './api/catalog.js';

const debug = true;

export default class Cart {
    static reloadCartEachOpen = false; // highlight new cart item while this option set to true will not work.

    /**
     * Function constructor() : Create Cart
     * 
     * @param {API_Cart} cart
     * @param {API_Catalog} catalog 
     */
    constructor(cart, catalog) {
        this.cart = [];

        this.apiCart = cart;
        this.apiCatalog = catalog;

        this.elements = {
            header: {
                togglerAmount: $('header #toggler .amount')
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
            onCheckout: () => {}
        }
    }

    /**
     * Function initialize() : Initialize Cart
     */
    initialize() {
        if (debug) console.log(`${this.constructor.name}::initialize()`);

        const { cart } = this.elements;
        
        cart.self.on('click', '.items .close', ((e) => this.onItemRemove(e)));
        cart.checkout.click(this.events.onCheckout.bind(this));

        this.get();
    }

    /**
     * Function on() : Delcare event callback
     * 
     * @param {'checkout'} event 
     * @param {{function()} } callback 
     */
    on(event, callback) {
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
     * Function get() : Get cart from server
     */
    get() {
        if (debug) console.log(`${this.constructor.name}::get()`);

        const { cart, header } = this.elements;

        // clear toggler amount
        header.togglerAmount.html(0);

        // clear visual cart
        this.cart.items = [];
        this.cart.total = 0;

        // clear dom cart except .total
        if (cart.items.length > 0) {
            cart.items.find('.item').remove();
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

        const { cart, header } = this.elements;

        // remove empty item slots from cart
        this.cart.items = this.cart.items.filter(function (el) {
            return el != null;
        });

        this.efficientEmptyState(Boolean(this.cart.items.length));

        // set the price
        cart.totalPrice.html(this.cart.total.toFixed(2));

        // set amount of products ONLY!!! to toggler
        header.togglerAmount.html(this.cart.items.length);
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

        const { cart } = this.elements;

        // clear highlight
        cart.items.find('.item').css('animation', 'none');
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

        const { cart } = this.elements;

        const foundItemKey = this.getItemKeyById(item.id);
        
        const getDomItem = () => cart.items.find(`.item[data-id='${item.id}']`);

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

        const { cart } = this.elements;

        const foundProductKey = this.getItemKeyById(item.id);

        if (foundProductKey) {
            // update virtual cart
            delete this.cart.items[foundProductKey];

            // update dom cart
            cart.items.find(`.item[data-id='${item.id}']`).remove();

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

        const { cart, header } = this.elements;

        if (state) {
            cart.empty.hide();
            cart.checkout.addClass('open');
            cart.itemsTotal.addClass('open');
            header.togglerAmount.show();
        } else {
            cart.empty.show();
            cart.checkout.removeClass('open');
            cart.itemsTotal.removeClass('open');
            header.togglerAmount.hide();
        }
    }
}
