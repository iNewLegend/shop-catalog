/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for adding items to cart.
 */
import Component from '../../../components/cart/item/component';

export class Add extends  ( $flow.commandBases.CommandInternal )  {
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

		const component = this.getController().getComponent();

		return $flow.managers.data.post( 'Components/Cart/Data/Add', { id, amount } )
			.then( () => addItem( product ) )
	}

	/**
	 * function doInsertItem() : Insert item.
	 *
	 * @param {Component} item
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
	 * @param {Component} item
	 * @param {boolean} notifyCartChanged
	 * @param {boolean} highlight
	 */
	doAddItem( item, notifyCartChanged = true, highlight = false ) {
		this.logger.startWith( { item, notifyCartChanged, highlight } );

		const itemId = item.model.id,
			existItem = this.getController().getModel().getById( itemId )

		existItem ?
			existItem.model.amount += item.model.amount : // Should be command.
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
	 * @returns {Component}
	 */
	createItem( data ) {
		const { logger } = this;

		logger.startWith( { data } );

		data.id = parseInt( data.id );

		return new Component( () => this.getController().getComponent().elements.items(), {
			logger,
			...data,
		} );
	}
}

export default Add;
