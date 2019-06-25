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

    page = 0;

    /**
     * Function constructor() : Create Catalog
     * 
     * @param {API} api 
     */
    constructor(api) {
        this.apiCatalog = new API_Catalog(api);

        this.cart = new Cart(api, this.apiCatalog);

        this.elements = {
            headerToggler: $('header #toggler'),

            sidebar: $('#sidebar'),
            sidebarCloseButton: $('#sidebar #close'),

            overlay: $('#overlay'),

            paginationPrev: $("#pagination .prev"),
            paginationNext: $("#pagination .next"),

            catalog: $('#catalog'),
            catalogSpinner: $('#catalog #spinner'),

            templateProduct: $('template#product'),

            pagination: $('#pagination'),
            paginationPlaceholder: $('#pagination .placeholder'),
        };

        this.elements.headerToggler.click(() => this.sidebarToggle(true));
        this.elements.overlay.click(() => this.sidebarToggle(false));
        this.elements.sidebarCloseButton.click(() => this.sidebarToggle(false));

        this.elements.paginationNext.click(() => this.onPageChange((this.page + 1)));
        this.elements.paginationPrev.click(() => this.onPageChange((this.page - 1)));

        this.elements.catalog.on('change', '.product .amount', ((e) => this.onProudctAmountChange(e)));
        this.elements.catalog.on('click', '.product button', ((e) => this.onProductAdd(e)));
    }

    /**
     * Function initialize() : Initialize catalog
     */
    initialize() {
        if (debug) console.log(`${this.constructor.name}::initialize()`);

        this.getCatalog(0, () => {
            this.cart.initialize();
        });
    }


    /**
     * Function onPageChange() : Called on page change
     * 
     * @param {number} page 
     */
    onPageChange(page) {
        if (debug) console.log(`${this.constructor.name}::onPageChange('${page}')`);

        --page;

        this.elements.catalogSpinner.show();

        this.elements.pagination.hide();

        this.elements.catalog.children('.product').remove();

        this.elements.paginationPlaceholder.empty();

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

        let product = this.apiCatalog.getLocalProductById(id);

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
            sidebar.addClass('show');

            this.cart.onOpen();

            return;
        }

        overlay.fadeOut();
        sidebar.removeClass('show');

        this.cart.onClose();
    }

    /**
     * Function setPagination() : Set pagination to dom.
     * 
     * @param {{}} pagination 
     */
    setPagination(pagination) {
        // pages
        for (let i = 0; i < pagination.pages; ++i) {

            const anchor = $(`<a href="#">${i + 1}</a>`)

            anchor.click(function (val) {
                this.onPageChange(val);
            }.bind(this, parseInt(anchor.html())));

            this.elements.paginationPlaceholder.append(anchor);

            this.elements.pagination.fadeIn();
        }

        // set page
        this.page = pagination.current + 1;

        // next
        if (pagination.current >= (pagination.pages - 1)) {
            this.elements.paginationNext.hide();
        } else {
            this.elements.paginationNext.show();
        }

        // prev
        if (this.page == 1) {
            this.elements.paginationPrev.hide();
        } else {
            this.elements.paginationPrev.show();
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

        this.apiCatalog.get(data => {
            // used slow here to fake loading
            this.elements.catalogSpinner.fadeOut('slow', () => {
                if (!data.error) {

                    this.setPagination(data.pagination);

                    data.result.map((item) => {
                        let templateHtml = this.elements.templateProduct.html();

                        // fine for now.
                        templateHtml = templateHtml.replace('${id}', item.id);
                        templateHtml = templateHtml.replace('${name}', item.name);
                        templateHtml = templateHtml.replace('${price}', item.price);
                        templateHtml = templateHtml.replace('${id}', item.id);

                        this.elements.catalog.append($(templateHtml));
                    });

                    if (onSuccess) onSuccess();
                }
            });
        }, page);
    }
}