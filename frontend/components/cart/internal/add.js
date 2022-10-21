/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for adding items to cart.
 */
import ItemComponent from "../item/component";

import $flow from "@appsflow/core";
import $mvc from '@appsflow/mvc'

export class Add extends $flow.commandBases().CommandInternal  {
	static getName() {
		return 'Components/Cart/Internal/Add';
	}

	async apply( args, options ) {
		const id = parseInt( args.id ),
			amount = parseInt( args.amount ),
			product = Object.assign( {}, args, { id, amount } ),
			addItem = ( product ) => {
				this.doAddItem(
					this.createItemComponent( product ),
					! options.local
				);
			}

		if ( options.local ) {
			return addItem( product );
		}

		return $flow.managers().data.create( 'Components/Cart/Data/Add', { id, amount } )
			.then( () => addItem( product ) )
	}

	/**
	 * function doInsertItem() : Insert item.
	 *
	 * @param {ItemComponent} item
	 */
	doInsertItem( item ) {
		// Hook item insert.
		this.logger.startWith( { item } );

		/**
		 * @type {CartController}
		 */
		const controller = $flow.managers().controllers.get( 'Components/Cart/Controller' )

		controller.model.items.pushSilent( item );

		item.render();
	}

	/**
	 * Function doAddItem() : Adds item to cart
	 *
	 * @param {ItemComponent} item
	 * @param {boolean} highlight
	 */
	doAddItem( item, highlight = false ) {
		this.logger.startWith( { item, highlight } );

		const itemId = item.model.id,
			controller = $flow.managers().controllers.get( 'Components/Cart/Controller' ),
			existItem = controller.model.getById( itemId )

		// TODO: Fix `model.amount` is string.
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
	 * @returns {ItemComponent}
	 */
	createItemComponent( data ) {
		const { logger } = this;

		logger.startWith( { data } );

		data.id = parseInt( data.id );

		// In other words: create the whole MVC in some area upon some data.
		return new ItemComponent( () => $mvc.Factory.getElementRef( 'Components/Cart/Component/Items' ), {
			logger,
			...data,
		} );
	}
}

export default Add;
