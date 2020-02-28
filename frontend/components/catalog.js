/**
 * @file: js/components/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */

import Services from 'SERVICES';
import Modules from 'MODULES';
import Container from 'CORE/container.js';
import ElementBase from 'CORE/element/base';

export default class Catalog extends Container {
    static amountMaxValue = 999;
    static amountMinValue = 1;

    constructor( parent, context, options ) {
    	super( parent, context, options );

        this.logger = new Modules.Logger(`Components.${this.constructor.name}`, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith( { parent, context, options } );

        this.apiCatalog = options.api;

        this.page = 0;

        this.events = {
            onInitialRecv: () => { },
            onProductAdd: (product) => { },
        };

        this.afterRender = () => {
        	super.afterRender();

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

            this._initialize();
        }
    }

    /**
     * Function _initialize() : Initialize catalog
     */
    _initialize() {
        this.logger.startEmpty();

        this.elements.pagination.next.click(() => this._onPageChange((this.page + 1)));
        this.elements.pagination.prev.click(() => this._onPageChange((this.page - 1)));

        this.elements.catalog.self.on('change', '.product .amount', ((e) => this._onProductAmountChange(e)));
        this.elements.catalog.self.on('click', '.product button', ((e) => this._onProductAdd(e)));

        this._getCatalog(0, this._onInitialRecv.bind(this));
    }

    /**
     * Function onInitialRecv() : Called on success of intial getCatalog request
     */
    _onInitialRecv() {
        this.events.onInitialRecv();
    }

    /**
     * Function _onPageChange() : Called on page change
     *
     * @param {number} page
     */
    _onPageChange(page) {
        this.logger.startWith({ page });

        const { catalog, pagination } = this.elements;

        --page;

        catalog.self.children('.product').remove();
        catalog.spinner.show();

        pagination.self.hide();
        pagination.placeHolder.empty();

        this._getCatalog(page);
    }

    /**
     * Function _onProductAdd() : Called on "Add to cart button"
     *
     * @param {event} e
     */
    _onProductAdd(e) {
        this.logger.startWith({ e });

        // maybe there is better way.
        const el = $(e.currentTarget);
        const domProduct = el.parentsUntil('.product').parent();

        const id = parseInt(domProduct.attr('data-id'));
        const amount = parseInt(domProduct.find('.amount').val());

        let product = this.apiCatalog.getLocalProductById(id);

        Object.assign(product, { id, amount });

        // call callback
        this.events.onProductAdd(product)

        // put it back to 1.
        domProduct.find('.amount').val('1');
    }

    /**
     * Function _onProductAmountChange() : Called on "Product Amount Change"
     *
     * @param {Event} e
     */
    _onProductAmountChange(e) {
        this.logger.startWith({ e });

        // maybe there is better way.
        const el = $(e.currentTarget);

        let val = el.val();

        this.logger.debug(`val: '${val}'`);

        if (val > Catalog.amountMaxValue) {
            val = Catalog.amountMaxValue;
        } else if (val < Catalog.amountMinValue) {
            val = Catalog.amountMinValue;
        }

        el.val(val);
    }

    /**
     * Function _getCatalog() : Get catalog from the server.
     *
     * @param {number} page
     * @param {{function()}} onSuccess
     */
    _getCatalog(page, onSuccess = null) {
        this.logger.startWith({ page, onSuccess });

        const { catalog, template } = this.elements;

        this.apiCatalog.get(data => {
	        //debugger;

	        // used slow here to fake loading
            catalog.spinner.fadeOut('slow', () => {

                if (!data.error) {

                    this._setPagination(data.pagination);

                    data.result.map((product) => {
                        catalog.self.append(this.renderProduct(product));
                    });

                    if (onSuccess) onSuccess();
                }
            });
        }, page);
    }

    /**
     * Function _setPagination() : Set pagination to dom.
     *
     * @param {{}} paginationResult
     */
    _setPagination(paginationResult) {
        this.logger.startWith({ paginationResult });

        const { pagination } = this.elements;

        // pages
        for (let i = 0; i < paginationResult.pages; ++i) {

            const anchor = $(`<a href="#">${i + 1}</a>`)

            anchor.click(function (val) {
                this._onPageChange(val);
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
     * Function on() : Declare event callback
     *
     * @param {'initialRecv'|'productAdd'} event
     * @param {{function()}} callback
     */
    on(event, callback) {
        this.logger.startWith({ event, callback });

        switch (event) {
            case 'initialRecv': {
                this.events.onInitialRecv = callback;
            } break;

            case 'productAdd': {
                this.events.onProductAdd = callback;
            } break;


            default: {
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
            }
        }
    }

    /**
     * Function renderProduct() : Return html markup for product
     *
     * @param {{}} product
     */
    renderProduct(product) {
        const { id, name, price } = product;

        return (`
            <div class="product" data-id="${id}">
                <img src="img/product-${id}.jpg">
                <h4 class="name color-secondary">${name}</h4>

                <div class="footer">
                    <h5>Price: <span class="price">${price}$</span></h5>
                    <div class="row">
                        <button class="bg-primary">Add To Cart</button>
                        <input class="amount" type="number" name="amount"
                            value="1" min="1">
                    </div>
                </div>
            </div>
        `)
    }

    _render() {
        // TODO: spinner and pagination should be components.
        const markup = (`
            <div id="catalog" class="row">
                <div class="spinner" style="border-top-color: lightskyblue"></div>
            </div>
            
            <div id="pagination" class="pagination" style="display: none">
                <div class="pagination">
                    <a class="prev" href="#">&laquo;</a>
                    <span class="placeholder">
                    </span>
                    <a class="next" href="#">&raquo;</a>
                </div>
            </div>
        `);

        return markup;
    }

    render() {
        this.beforeRender();

        super.render( true );

        const markup = (`
            <div class="container" style="max-width: 1080px;">
                ${ this._render() }
            </div>
        `), element = new ElementBase( this, markup );


        element.render();

        this.afterRender();
    }
}
