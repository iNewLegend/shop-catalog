/**
 * @file: js/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */

import API from './api/api.js';
import API_Catalog from './api/catalog.js';

import Cart from './cart.js'

const debug = true;

export default class Catalog {
    static openCartOnUpdate = true;

    static amountMaxValue = 999;
    static amountMinValue = 1;

    /**
     * Function constructor() : Create Catalog
     * 
     * @param {API} api 
     */
    constructor(api) {
        this.catalog = new API_Catalog(api);

        this.cart = new Cart(api, this.catalog);

        this.page = 0;

        this.elements = {
            header: {
                toggler: $('header #toggler')
            },

            sidebar: {
                self: $('#sidebar'),
                closeButton: $('#sidebar #close'),
            },

            overlay: $('#overlay'),

            pagination: {
                self: $('#pagination'),
                prev: $("#pagination .prev"),
                next: $("#pagination .next"),
                placeHolder: $('#pagination .placeholder')
            },

            catalog: {
                self: $('#catalog'),
                spinner: $('#catalog #spinner'),
            },

            template: {
                product: $('template#product'),
            }
        };

        this.events = {
            onCheckout: () => {},
        }
    }

    /**
     * Function initialize() : Initialize catalog
     */
    initialize() {
        if (debug) console.log(`${this.constructor.name}::initialize()`);

        const { header, overlay, sidebar, pagination, catalog } = this.elements;

        overlay.click(() => this.sidebarToggle(false));

        header.toggler.click(() => this.sidebarToggle(true));
        sidebar.closeButton.click(() => this.sidebarToggle(false));

        pagination.next.click(() => this.onPageChange((this.page + 1)));
        pagination.prev.click(() => this.onPageChange((this.page - 1)));

        catalog.self.on('change', '.product .amount', ((e) => this.onProudctAmountChange(e)));
        catalog.self.on('click', '.product button', ((e) => this.onProductAdd(e)));

        this.cart.on('checkout', () => {
            this.sidebarToggle(false);
            this.events.onCheckout();
        });

        this.getCatalog(0, () => {
            this.cart.initialize();
        });
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
     * Function onPageChange() : Called on page change
     * 
     * @param {number} page 
     */
    onPageChange(page) {
        if (debug) console.log(`${this.constructor.name}::onPageChange('${page}')`);

        const { catalog, pagination } = this.elements;

        --page;

        catalog.self.children('.product').remove();
        catalog.spinner.show();

        pagination.self.hide();
        pagination.placeHolder.empty();

        this.getCatalog(page);
    }

    /**
     * Function onProductAdd() : Called on "Add to cart button"
     * 
     * @param {event} e 
     */
    onProductAdd(e) {
        if (debug) console.log(`${this.constructor.name}::onProductAdd()`);

        // maybe there is better way.
        const el = $(e.currentTarget);
        const domProduct = el.parentsUntil('.product').parent();

        const id = parseInt(domProduct.attr('data-id'));
        const amount = parseInt(domProduct.find('.amount').val());

        let product = this.catalog.getLocalProductById(id);

        Object.assign(product, { id, amount });

        this.cart.onItemAdd(product, () => {
            if (Catalog.openCartOnUpdate) {
                this.sidebarToggle(true);
            }
        });

        // put it back to 1.
        domProduct.find('.amount').val('1');
    }

    /**
     * Function onProudctAmountChange() : Called on "Product Amount Change"
     * 
     * @param {event} e 
     */
    onProudctAmountChange(e) {
        // maybe there is better way.
        const el = $(e.currentTarget);

        let val = el.val();

        if (debug) console.log(`${this.constructor.name}::onProudctAmountChange('${val}')`);

        if (val > Catalog.amountMaxValue) {
            val = Catalog.amountMaxValue;
        } else if (val < Catalog.amountMinValue) {
            val = Catalog.amountMinValue;
        }

        el.val(val);
    }

    /**
     * Function sidebarToggle() : Change the sidebar state
     * 
     * @param {boolean} state 
     */
    sidebarToggle(state) {
        if (debug) console.log(`${this.constructor.name}::sidebarToggle('${state}')`);

        // this is function can move to app.js

        const { sidebar, overlay } = this.elements;

        if (state) {
            overlay.fadeIn();
            sidebar.self.addClass('show');

            this.cart.onOpen();

            return;
        }

        overlay.fadeOut();
        sidebar.self.removeClass('show');

        this.cart.onClose();
    }

    /**
     * Function setPagination() : Set pagination to dom.
     * 
     * @param {{}} paginationResult 
     */
    setPagination(paginationResult) {
        if (debug) console.log(`${this.constructor.name}::setPagination('${JSON.stringify(paginationResult)}')`);

        const { pagination } = this.elements;

        // pages
        for (let i = 0; i < paginationResult.pages; ++i) {

            const anchor = $(`<a href="#">${i + 1}</a>`)

            anchor.click(function (val) {
                this.onPageChange(val);
            }.bind(this, parseInt(anchor.html())));

            pagination.placeHolder.append(anchor);

            pagination.self.fadeIn();
        }

        // set page
        this.page = paginationResult.current + 1;

        // next
        if (paginationResult.current >= (paginationResult.pages - 1)) {
            pagination.next.hide();
        } else {
            pagination.next.show();
        }

        // prev
        if (this.page == 1) {
            pagination.prev.hide();
        } else {
            pagination.prev.show();
        }
    }

    /**
     * Function getCatalog() : Get catalog from the server.
     * 
     * @param {number} page 
     * @param {function()} onSuccess
     */
    getCatalog(page, onSuccess = null) {
        if (debug) console.log(`${this.constructor.name}::getCatalog('${page}')`);

        const { catalog, template } = this.elements;

        this.catalog.get(data => {
            // used slow here to fake loading
            catalog.spinner.fadeOut('slow', () => {
                if (!data.error) {

                    this.setPagination(data.pagination);

                    data.result.map((item) => {
                        let templateHtml = template.product.html();

                        // fine for now.
                        templateHtml = templateHtml.replace('${id}', item.id);
                        templateHtml = templateHtml.replace('${name}', item.name);
                        templateHtml = templateHtml.replace('${price}', item.price);
                        templateHtml = templateHtml.replace('${id}', item.id);

                        catalog.self.append($(templateHtml));
                    });

                    if (onSuccess) onSuccess();
                }
            });
        }, page);
    }
}