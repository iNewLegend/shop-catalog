/**
 * @file: components/cart/internal/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for adding items to cart.
 */
import CartItemComponent from 'COMPONENTS/cart/item/component';

/**
 * @memberOf components.cart.internal
 */
export class Add extends $core.internal.Command {
	static getNamespace() {
		return 'Components/Cart/Internal'
	}

	static getName() {
		return 'Components/Cart/Internal/Add';
	}

	async apply( args, options ) {
		const id = parseInt( args.id ),
			amount = parseInt( args.amount );

		let product = options.manual ? args :
			await $core.data.get( 'Components/Catalog/Data/Index', { id }, { local: true } );

		// Assign `id` and `amount`.
		product = Object.assign( {}, product, { id, amount } );

		const addItem = ( product ) => {
			this.doAddItem(
				this.createItem( product ),
				true,
				! options.local
			);
		}

		if ( options.local ) {
			return addItem( product );
		}

		return $core.data.post( 'Components/Cart/Data/Add', { id, amount } ).then( () => addItem( product ) );
	}

	/**
	 * function doInsertItem() : Insert item.
	 *
	 * @param {components.cart.item.Component} item
	 */
	doInsertItem( item ) {
		// Hook item insert.
		this.logger.startWith( { item } );

		this.getController().getModel().items.pushSilent( item );

		item.render();
	}

	/**
	 * Function doAddItem() : Adds item to cart
	 *
	 * @param {components.cart.item.Component} item
	 * @param {boolean} notifyCartChanged
	 * @param {boolean} highlight
	 */
	doAddItem( item, notifyCartChanged = true, highlight = false ) {
		this.logger.startWith( { item, notifyCartChanged, highlight } );

		const itemId = item.model.id,
			existItem = this.getController().getModel().getById( itemId )

		existItem ?
			existItem.model.amount += item.model.amount :
			this.doInsertItem( item );

		if ( ! highlight ) {
			return;
		}

		( existItem || item ).highlightItem();
	}

	/**
	 * Function createItem() : Create new item.
	 *
	 * @param {Object} data
	 *
	 * @returns {components.cart.item.Component}
	 */
	createItem( data ) {
		const { logger } = this;

		logger.startWith( { data } );

		data.id = parseInt( data.id );

		const parent = this.getController().getComponent().elements.items;

		return new CartItemComponent( parent, {
			logger,
			... data,
		} );
	}
}

export default Add;
