<?php
/**
 * @file    : controllers/catalog.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 *
 * @desc    :   : Catalog Controller
 */

namespace Controllers;

use Helpers\CommonResponder;
use Services\Database;

class Catalog {

	const PER_PAGE = 8; // another way, you can create another config file for that.

	/**
	 * Instance of Catalog Model
	 *
	 * @var \Models\Catalog
	 */
	private $catalogModel;

	/**
	 * Function __construct() Create Catalog Controller
	 */
	public function __construct() {
		$this->catalogModel = new \Models\Catalog( Database::getInstance()->getPDO() );
	}

	/**
	 * Function index() : Get Catalog items per page
	 *
	 * @param int $page
	 *
	 * @return array
	 */
	public function index( $page = 0 ) {
		$result = [];

		$totalCount = 0;
		$perPage = SELF::PER_PAGE;

		$result['result'] = $this->catalogModel->getAll( $page, $perPage, $totalCount );

		CommonResponder::addPagination( $result, $page, $perPage, $totalCount );

		return $result;
	}

	/**
	 * Function get() : Get Catalog items with specific id's
	 *
	 * @param string $ids
	 *
	 * @return array
	 */
	public function get( string $ids ) {
		return $this->catalogModel->getByIds( explode( ',', $ids ) );
	}
}
