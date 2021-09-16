/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */
import 'CORE';

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

		this.sidebar = new components.Sidebar( window.document.querySelector( '#sidebar' ).parentElement );

		this.elements = {
			header: {
				logo: $core.Factory.createElement( 'header #logo' ),
				toggle: $core.Factory.createElement( 'header #toggle' ),
				cart: $core.Factory.createElement( 'header #toggle .cart' ),
				amount: $core.Factory.createElement( 'header #toggle .amount' ),
				spinner: $core.Factory.createElement( 'header #toggle .spinner' )
			},

			sidebar: {
				self: $core.Factory.createElement( '#sidebar' ), // TODO: Self should not be exist, if you use self, it should be component.
				closeButton: $core.Factory.createElement( '#sidebar #close' ),
			},

			sections: {
				main: $core.Factory.createElement( "section.main" )
			}
		};

		this.container = new $core.Container( this.elements.sections.main, '<div class="page container"></div>' );

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

		const { header } = this.elements;

		header.toggle.click( () => $core.commands.run( 'Components/Sidebar/Commands/Toggle', { state: true } ) );

		header.logo.click( () => {
			this.container.set( this.pages.catalog );
			this.container.render();
		} );

		$core.commands.onBefore( 'Components/Sidebar/Commands/Toggle', ( args ) => {
			// Toggle virtual cart state.
			args.state ?
				this.cart.model.state = true :
				this.cart.model.state = false
		} );

		$core.commands.onAfter( 'Components/Catalog/Commands/Add', ( args ) => {
			const cartAddArgs = {
				... args.component.model.getModelData(),
				amount: args.component.elements.amount.value,
			};

			$core.internal.run( 'Components/Cart/Internal/Add', cartAddArgs );

			if ( $app.cart.constructor.openCartOnUpdate ) {
				$core.commands.run( 'Components/Sidebar/Commands/Toggle', { state: true } );
			}
		} );

		$core.data.onAfterOnce( 'Components/Catalog/Data/Index', () => {
			this.cart = new components.Cart( this.elements.sidebar.self, this.apis );

			this.cart.request().then( () => {
				this.cart.render()
			} );
		} );

		$core.data.onAfter( 'Components/Cart/Data/Index', this.onCartReceived.bind( this ) );
		$core.internal.onAfter( 'Components/Cart/Internal/ToggleEmptyState', this.onCartStateEmpty.bind( this ) );
		$core.internal.onAfter( 'Components/Cart/Internal/UpdateTotal', this.onCartSetTotal.bind( this ) );
		$core.commands.onAfter( 'Components/Cart/Commands/Checkout', this.onCartCheckout.bind( this ) );

		this.container.set( this.pages.catalog );
		this.container.render();
	}

	async onCartReceived( args ) {
		if ( ! this.cartRecvOnce ) {
			this.cartRecvOnce = true;

			const { cart, spinner } = this.elements.header;

			cart.show();
			spinner.hide();
		}

		const data = args.result;

		if ( ! data ) {
			throw new Error();
		}

		// Not all the products that are in cart exist locally since we used pages in that system,
		// Wo we find out what missing and request it from the server.
		const asyncFilter = async ( arr, predicate ) => Promise.all( arr.map( predicate ) )
			.then( ( results ) => arr.filter( ( _v, index ) => results[ index ] ) );

		const missingProducts = await asyncFilter( data, async ( item ) => {
			// We get the price and name from local catalog.
			// There is many solutions, this is fine for that example.
			const localProduct = await $core.data.get( 'Components/Catalog/Data/Index', { id: item.id }, { local: true } );

			// Use extra info from local product
			if ( localProduct ) {
				item.price = localProduct.price;
				item.name = localProduct.name;

				await $core.internal.run( 'Components/Cart/Internal/Add', item, { local: true, manual: true } )

				return false;
			}

			return true;
		} );

		if ( ! missingProducts.length ) {
			return;
		}

		$core.data.get( 'Components/Catalog/Data/Get', { ids: missingProducts.map( x => x.id ) } ).then( ( missing ) => {
			data.map( ( item ) => {
				Object.assign( item, missing.find( x => x.id === item.id ) );
				$core.internal.run( 'Components/Cart/Internal/Add', item, { local: true, manual: true } )
			} );
		} );
	}

	/**
	 * Function onCartSetTotal() : Called on cart set total.
	 */
	onCartSetTotal() {
		this.logger.startEmpty();

		let totalItemsInCartCount = 0;

		this.cart.model.items.forEach( ( item ) => {
			totalItemsInCartCount += item.model.amount
		} );

		const { amount } = this.elements.header;

		amount.html( totalItemsInCartCount );
	}

	/**
	 * Function onCartStateEmpty() : Called on cart empty state change (cart have items|cart does have items)
	 *
	 * @param {Boolean} state
	 */
	onCartStateEmpty( { state } ) {
		this.logger.startWith( { state } );

		const { amount } = this.elements.header;

		state ? amount.show() : amount.hide();
	}

	/**
	 * Function onCartCheckout() : Called on cart checkout.
	 */
	onCartCheckout() {
		this.logger.startEmpty();

		$core.commands.run( 'Components/Sidebar/Commands/Toggle', { state: false } );

		this.container.set( this.pages.checkout );

		this.pages.checkout.on( 'render:after', () => {
			console.log( 'onCartCheckout this.page.checkout rendered' );
		} );

		this.container.render();
	}
}

document.addEventListener( 'readystatechange', () => {
	if ( window.initOnce  ) {
		return ;
	}

	window.$app = new App();

	$app.initialize();

	window.initOnce = true;
} );

