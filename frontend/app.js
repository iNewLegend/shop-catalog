/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */
import './app-flow/';

import * as services from './services/';
import * as components from './components/';
import * as pages from './pages/';

class App {
	/**
	 * Function constructor() : Create App
	 */
	constructor() {
		services.Terminal.initialize();

		// Tell logger act differently when it see instanceOf `$flow.Component`.
		$flow.modules.Logger.createCustomWrapper( $flow.Component, ( obj ) => {
			if ( obj instanceof $flow.Component ) {
				return {
					// Return readable version of component, instead of logging all the HTML.
					__CUSTOM_LOGGER_WRAPPER__: true,
					name: obj.getName(),
					model: obj?.model?.getModelData() || obj,
				}
			}
		} )

		this.logger = new $flow.modules.Logger( this, true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startEmpty();

		this.sidebar = new components.Sidebar( window.document.querySelector( '#sidebar' ).parentElement );

		this.elements = {
			header: {
				logo: $flow.Factory.createElement( 'header #logo' ),
				toggle: $flow.Factory.createElement( 'header #toggle' ),
				cart: $flow.Factory.createElement( 'header #toggle .cart' ),
				amount: $flow.Factory.createElement( 'header #toggle .amount' ),
				spinner: $flow.Factory.createElement( 'header #toggle .spinner' )
			},

			sidebar: {
				self: $flow.Factory.createElement( '#sidebar' ), // TODO: Self should not be exist, if you use self, it should be component.
				closeButton: $flow.Factory.createElement( '#sidebar #close' ),
			},

			sections: {
				main: $flow.Factory.createElement( "section.main" )
			}
		};

		this.container = new $flow.Container( this.elements.sections.main, '<div class="page container"></div>' );

		this.pages = {
			catalog: new pages.Catalog( this.container, '<div class="pages catalog"></div>' ),
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

		this.hookSidebar();
		this.hookCatalog();
		this.hookCart();

		this.container.set( this.pages.catalog );
		this.container.render();
	}

	hookSidebar() {
		const { header } = this.elements;

		header.logo.click( () => {
			this.container.set( this.pages.catalog );
			this.container.render();
		} );

		header.toggle.click( () => $flow.managers.commands.run( 'Components/Sidebar/Commands/Toggle', { state: true } ) );

		$flow.managers.commands.onBefore( 'Components/Sidebar/Commands/Toggle', ( args ) => {
			// Toggle virtual cart state.
			$flow.managers.internal.run( 'Components/Cart/Internal/ToggleState', args );
		} );
	}

	hookCatalog() {
		// On adding item from catalog.
		$flow.managers.commands.onAfter( 'Components/Catalog/Commands/Add', ( args ) => {
			// Add item to cart.
			$flow.managers.internal.run( 'Components/Cart/Internal/Add', {
				...args.component.model.getModelData(),
				amount: args.component.elements.amount.value,
			} );

			// Toggle sidebar and show cart
			$flow.managers.commands.run( 'Components/Sidebar/Commands/Toggle' );
		} );

		// On receive catalog.
		$flow.managers.data.onAfterOnce( 'Components/Catalog/Data/Index', () => {
			// Initialize cart.
			this.cart = new components.Cart( this.elements.sidebar.self, this.apis );

			// Request the cart from the server.
			$flow.managers.data.get( 'Components/Cart/Data/Index' );
		} );
	}

	hookCart() {
		// On cart update total.
		$flow.managers.internal.onAfter( 'Components/Cart/Internal/UpdateTotal', () => {
			let totalItemsInCartCount = 0;

			// Get total from all products in cart.
			this.cart.model.items.forEach( ( item ) => {
				totalItemsInCartCount += item.model.amount
			} );

			// Update total amount in DOM.
			const { amount } = this.elements.header;

			amount.html( totalItemsInCartCount );

			totalItemsInCartCount ? amount.show() : amount.hide();
		} );

		// On cart checkout button click.
		$flow.managers.commands.onAfter( 'Components/Cart/Commands/Checkout', () => {
			// Toggle the sidebar off.
			$flow.managers.commands.run( 'Components/Sidebar/Commands/Toggle', { state: false } );

			// Select checkout page.
			this.container.set( this.pages.checkout );
			this.container.render();
		} );

		// On receiving cart data from server.
		$flow.managers.data.onAfter( 'Components/Cart/Data/Index', async ( args ) => {
			// If its first time.
			if ( ! this.cartRecvOnce ) {
				this.cartRecvOnce = true;

				const { cart, spinner } = this.elements.header;

				// Hide the spinner and show cart.
				cart.show();
				spinner.hide();
			}

			// Not all the products that are in cart exist locally, since the catalog loaded by request and get the data per page.
			// Find out missing product and request it from the server.
			const cartItems = args.result,
				// Get local items from the catalog.
				localCatalogItems = await $flow.managers.data.get( 'Components/Catalog/Data/Index', {}, { local: true } ),
				missingProducts = [];

			// Find out missing products.
			cartItems.forEach( ( cartItem ) => {
				const localItem = localCatalogItems.find( ( localItem ) => localItem.id === cartItem.id );

				if ( ! localItem ) {
					missingProducts.push( cartItem.id );
				}
			} );

			const addCartItems = ( items, missing = [] ) => {
				items.forEach( ( item ) => {
					// If that item is the missing item, assign his values to current item.
					const missedItem = missing.find( ( missingItem ) => missingItem.id === item.id );

					// If item find as missing, merge his values to current item.
					// else get item from the catalog.
					if ( missedItem ) {
						item = Object.assign( item, missedItem );
					} else {
						item = Object.assign( item, localCatalogItems.find( ( localItem ) => localItem.id === item.id ) );
					}

					// Add missing product to the cart.
					$flow.managers.internal.run( 'Components/Cart/Internal/Add', item, { local: true } )
				} );

				this.cart.render();
			}

			if ( ! missingProducts.length ) {
				addCartItems( cartItems );

				return;
			}

			// Request missing products, On receiving missing products, add cart items to catalog.
			$flow.managers.data.get( 'Components/Catalog/Data/Get', { ids: missingProducts } )
				.then( ( missing ) => addCartItems( cartItems, missing ) )
		} );
	}
}

document.addEventListener( 'readystatechange', () => {
	if ( window.initOnce ) {
		return;
	}

	window.$app = new App();

	$app.initialize();

	window.initOnce = true;
} );

