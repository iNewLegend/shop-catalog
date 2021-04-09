<?php
/**
 * @file    : controllers/cart.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 * @todo    : since we using cookies there should be maximum of product types in cart.
 */

namespace Controllers;

use Helpers\CommonError;
use Helpers\CommonResponder;
use Services\Database;

class Cart {

	/**
	 * Instance of Catalog Model
	 *
	 * @var \Models\Catalog
	 */
	private $catalogModel;

	/**
	 * Cart Object (Can be class if you wish) \Models\Cart
	 *
	 * @var array
	 */
	private $cart;

	/**
	 * Function __construct() Create Cart Controller
	 */
	public function __construct() {
		$this->catalogModel = new \Models\Catalog( Database::getInstance()->getConnection() );

		if ( ! isset( $_COOKIE['cart'] ) ) {
			$this->cart = [];
		} else {
			$this->cart = json_decode( $_COOKIE['cart'], true );
		}
	}

	/**
	 * Function __destruct() : Destroy the controller
	 */
	public function __destruct() {
		// this is works.
		setcookie( 'cart', json_encode( $this->cart ) );
	}

	/**
	 * Function index() : Get Cart
	 *
	 * @return array
	 */
	public function index() {
		return $this->cart;
	}

	/**
	 * Function addItem() Add item to cart
	 *
	 * @param int $id
	 * @param int $amount
	 *
	 * @return array|string|false
	 */
	public function addItem( int $id, int $amount ) {
		if ( $product = $this->catalogModel->getById( $id ) ) {

			$cartFoundKey = null;

			foreach ( $this->cart as $key => $item ) {
				if ( isset( $item['id'] ) && $item['id'] == $id ) {
					$cartFoundKey = $key;
					break;
				}
			}

			$product['amount'] = $amount;

			// unset price and name, so it wont get to client. in frontend use catalog for that.
			unset( $product['price'] );
			unset( $product['name'] );

			// if item already exist
			if ( $cartFoundKey !== null ) {
				$product['amount'] += $this->cart[ $cartFoundKey ]['amount'];

				$this->cart[ $cartFoundKey ] = $product;
			} else {
				$this->cart[] = $product;
			}

			return $product;
		}

		return CommonResponder::errorMessage( CommonError::system_error );
	}

	/**
	 * Function removeItem() : Removes item from cart
	 *
	 * @param int $id
	 *
	 * @return array|string|false
	 */
	public function removeItem( int $id ) {
		$cartFoundKey = null;

		foreach ( $this->cart as $key => $item ) {
			if ( isset( $item['id'] ) && $item['id'] == $id ) {
				$cartFoundKey = $key;
				break;
			}
		}

		if ( $cartFoundKey === null ) {
			return CommonResponder::errorMessage( CommonError::item_not_found );
		}

		if ( $product = $this->catalogModel->getById( $id ) ) {
			$product['amount'] = $this->cart[ $cartFoundKey ]['amount'];

			unset( $this->cart[ $cartFoundKey ] );

			// Rebase array keys after un-setting elements, cart send in JSON format.
			$this->cart = array_values( $this->cart );

			return $product;
		}

		return CommonResponder::errorMessage( CommonError::system_error );
	}
}
