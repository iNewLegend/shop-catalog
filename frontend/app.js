/**
 * @file: app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */
import "@babel/polyfill"
import * as core from 'CORE'
import * as api from 'API';
import * as services from 'SERVICES';
import * as components from 'COMPONENTS';
import * as pages from 'PAGES';

// TODO Should extend `core.Container` instead of using naked class.
class App {
	/**
	 * Function constructor() : Create App
	 */
	constructor() {
		services.Terminal.initialize();

		this.logger = new $core.modules.Logger( this, true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startEmpty();

		// TODO: Remove `this.apis` use `$core.data` commands.
		const http = $core.data.constructor.client;

		this.apis = {
			catalog: new api.Catalog( http ),
		};

		this.elements = {
			header: {
				logo: core.Factory.createElement( 'header #logo' ),
				toggle: core.Factory.createElement( 'header #toggle' ),
				cart: core.Factory.createElement( 'header #toggle .cart' ),
				amount: core.Factory.createElement( 'header #toggle .amount' ),
				spinner: core.Factory.createElement( 'header #toggle .spinner' )
			},

			sidebar: {
				self: core.Factory.createElement( '#sidebar' ), // TODO: Self should not be exist, if you use self, it should be component.
				closeButton: core.Factory.createElement( '#sidebar #close' ),
			},

			overlay: core.Factory.createElement( '#overlay' ),

			sections: {
				main: core.Factory.createElement( "section.main" )
			}
		};

		this.container = new core.Container( this.elements.sections.main, '<div class="page container"></div>' );

		this.pages = {
			catalog: new pages.Catalog( this.container, '<div class="pages catalog"></div>', {
				api: this.apis.catalog,
			} ),
			checkout: new pages.Checkout( this.container, '<div class="pages checkout">' +
				'   <h1>Check OUT.</h1>' +
				'</div>'
			),
		}
	}

	/**
	 * Function initialize() : Initialize App
	 */
	initialize() {
		this.logger.startEmpty();

		const { header, overlay, sidebar } = this.elements;

		this.container.on( 'render:before', this.onPageContainerBeforeRender.bind( this ) );

		overlay.click( () => this.sidebarToggle( false ) );

		header.toggle.click( () => this.sidebarToggle( true ) );

		header.logo.click( () => {
			this.container.set( this.pages.catalog );
			this.container.render();
		} );

		sidebar.closeButton.click( () => this.sidebarToggle( false ) );

		$core.data.onAfter( 'Components/Cart/Data/Index', async( args ) => {
			if ( ! this.cartRecvOnce ) {
				this.cartRecvOnce = true;

				const { cart, spinner } = this.elements.header;

				cart.show();
				spinner.hide();
			}

			const data = await args.result;

			// Not all the products that are in cart exist locally since we used pages in that system,
			// Wo we find out what missing and request it from the server.
			const missingProducts = data.filter( ( item ) => {
				// We get the price and name from local catalog.
				// There is many solutions, this is fine for that example.
				const localProduct = $core.data.get( 'Components/Catalog/Data/Index', { id: item.id }, { local: true } );

				// Use extra info from local product
				if ( localProduct ) {
					item.price = localProduct.price;
					item.name = localProduct.name;

					return false;
				}

				return true;
			} );

			this.apis.catalog.getByIds( ( missing ) => {
				data.map( ( item ) => {
					Object.assign( item, missing.find( x => x.id === item.id ) );
					$core.internal.run( 'Components/Cart/Internal/Add', item, { local: true } )
				} );
			}, missingProducts.map( x => x.id ) );
		} );

		this.container.set( this.pages.catalog );
		this.container.render();
	}

	/**
	 * Function onPageContainerBeforeRender()
	 *
	 * @param {modules.Page} pageModule
	 */
	onPageContainerBeforeRender( pageModule ) {
		this.logger.startWith( { pageModule: pageModule?.constructor.name } );

		if ( pageModule instanceof pages.Catalog ) {
			if ( ! this.cart ) {
				$core.data.onAfterOnce( 'Components/Catalog/Data/Index', () => {
					this.cart = new components.Cart( this.elements.sidebar.self, this.apis );

					this.cart.on( 'ui:checkout', this.onCartCheckout.bind( this ) );
					this.cart.on( 'cart:request', this.onCartRequest.bind( this ) );
					this.cart.on( 'amount:change', this.onCartAmountChange.bind( this ) );
					this.cart.on( 'state:empty', this.onCartStateEmpty.bind( this ) );

					this.cart.render();
				} );

				$core.commands.onAfter( 'Components/Catalog/Commands/Add', ( args ) => {
					const cartAddArgs = {
						... args.component.model.getModelData(),
						amount: args.component.elements.amount.value,
					};

					$core.internal.run( 'Components/Cart/Internal/Add', cartAddArgs );

					if ( $app.cart.constructor.openCartOnUpdate ) {
						$app.sidebarToggle( true );
					}
				} );
			}
		}
	}

	/**
	 * Function onCartRequest() : Called on request cart from the server
	 */
	onCartRequest() {
		this.logger.startEmpty();

		const { spinner } = this.elements.header;

		spinner.show();
	}

	/**
	 * Function onCartAmountChange() : Called on cart amount change.
	 *
	 * @param {Number} count
	 */
	onCartAmountChange( count ) {
		this.logger.startWith( { count } );

		const { amount } = this.elements.header;

		amount.html( count );
	}

	/**
	 * Function onCartStateEmpty() : Called on cart empty state change (cart have items|cart does have items)
	 *
	 * @param {Boolean} state
	 */
	onCartStateEmpty( state ) {
		this.logger.startWith( { state } );

		const { amount } = this.elements.header;

		state ? amount.show() : amount.hide();
	}

	/**
	 * Function onCartCheckout() : Called on cart checkout
	 */
	onCartCheckout() {
		this.logger.startEmpty();

		this.sidebarToggle( false );

		this.container.set( this.pages.checkout );

		this.pages.checkout.on( 'render:after', () => {
			console.log( 'onCartCheckout this.page.checkout rendered' );
		} );

		this.container.render();
	}

	/**
	 * Function sidebarToggle() : Change the sidebar state
	 *
	 * @param {boolean} state
	 */
	sidebarToggle( state ) {
		this.logger.startWith( { state } );

		const { sidebar, overlay } = this.elements;

		if ( state ) {
			overlay.fadeIn();
			sidebar.self.addClass( 'show' );

			this.cart.open();
		} else {
			overlay.fadeOut();
			sidebar.self.removeClass( 'show' );

			this.cart.close();
		}
	}
}

window.$app = new App();
$app.initialize();
