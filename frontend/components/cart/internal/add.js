/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for adding items to cart.
 */
import CartItemComponent from 'COMPONENTS/cart/item/component';

/**
 * @memberOf components.cart.internal
 */
export class Add extends ( $core.internal.Command ) {
	static getName() {
		return 'Components/Cart/Internal/Add';
	}

	async apply( args, options ) {
		const id = parseInt( args.id ),
			amount = parseInt( args.amount ),
			product = Object.assign( {}, args, { id, amount } ),
			addItem = ( product ) => {
				this.doAddItem(
					this.createItem( product ),
					true,
					! options.local
				);
			}

		if ( options.local ) {
			return addItem( product );
		}

		const component = this.getController().getComponent(),
			$itemsList = component.elements.items();

		return $core.data.post( 'Components/Cart/Data/Add', { id, amount } )
			.then( () => addItem( product ) )
			.then( () => {
				if ( false === $itemsList ) {
					component.render();
				}
			} )
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

		(existItem || item).highlightItem();
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

		return new CartItemComponent( () => this.getController().getComponent().elements.items(), {
			logger,
			...data,
		} );
	}
}

export default Add;
