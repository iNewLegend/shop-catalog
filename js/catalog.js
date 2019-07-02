/**
 * @file: js/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */

import API_Catalog from './api/catalog.js';

import Logger from './modules/logger.js';

export default class Catalog {
    static amountMaxValue = 999;
    static amountMinValue = 1;

    /**
     * Function constructor() : Create Catalog
     * 
     * @param {API_Catalog} catalog 
     */
    constructor(catalog) {
        this.logger = new Logger(this, true);
        this.logger.startEmpty();

        this.apiCatalog = catalog;

        this.page = 0;

        this.elements = {
            pagination: {
                self: $('#pagination'),
                prev: $("#pagination .prev"),
                next: $("#pagination .next"),
                placeHolder: $('#pagination .placeholder')
            },

            catalog: {
                self: $('#catalog'),
                spinner: $('#catalog .spinner'),
            },

            template: {
                product: $('template#product'),
            }
        };

        this.events = {
            onInitialize: () => {},
            onItemAdd: (product) => {},
        }
    }

    /**
     * Function initialize() : Initialize catalog
     */
    initialize() {
        this.logger.startEmpty();

        const { pagination, catalog } = this.elements;

        pagination.next.click(() => this.onPageChange((this.page + 1)));
        pagination.prev.click(() => this.onPageChange((this.page - 1)));

        catalog.self.on('change', '.product .amount', ((e) => this.onProudctAmountChange(e)));
        catalog.self.on('click', '.product button', ((e) => this.onProductAdd(e)));

        this.getCatalog(0, () => {
            this.events.onInitialize();
        });
    }

    /**
     * Function onPageChange() : Called on page change
     * 
     * @param {number} page 
     */
    onPageChange(page) {
        this.logger.startWith({ page });

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
        this.logger.startWith({ e });

        // maybe there is better way.
        const el = $(e.currentTarget);
        const domProduct = el.parentsUntil('.product').parent();

        const id = parseInt(domProduct.attr('data-id'));
        const amount = parseInt(domProduct.find('.amount').val());

        let product = this.apiCatalog.getLocalProductById(id);

        Object.assign(product, { id, amount });

        // call callback
        this.events.onItemAdd(product)

        // put it back to 1.
        domProduct.find('.amount').val('1');
    }

    /**
     * Function onProudctAmountChange() : Called on "Product Amount Change"
     * 
     * @param {event} e 
     */
    onProudctAmountChange(e) {
        this.logger.startWith({ e });

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
     * Function on() : Delcare event callback
     * 
     * @param {'initialize'|'itemAdd'} event 
     * @param {{function()} } callback 
     */
    on(event, callback) {
        this.logger.startWith({ event, callback });

        switch (event) {
            case 'initialize': {
                this.events.onInitialize = callback;
            } break;

            case 'itemAdd': {
                this.events.onItemAdd = callback;
            } break;


            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
            }
        }
    }

    /**
     * Function getCatalog() : Get catalog from the server.
     * 
     * @param {number} page 
     * @param {function()} onSuccess
     */
    getCatalog(page, onSuccess = null) {
        this.logger.startWith({ page, onSuccess });

        const { catalog, template } = this.elements;

        this.apiCatalog.get(data => {
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

    /**
     * Function setPagination() : Set pagination to dom.
     * 
     * @param {{}} paginationResult 
     */
    setPagination(paginationResult) {
        this.logger.startWith({ paginationResult });

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
}