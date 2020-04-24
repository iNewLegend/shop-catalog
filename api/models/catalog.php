<?php
/**
 * @file    : models/catalog.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 */

namespace Models;

use Helpers\CommonPdo;
use PDO;

class Catalog {

	const TABLE = 'catalog';

	/**
	 * PDO
	 *
	 * @var \PDO
	 */
	private $db;

	/**
	 * Function __construct() : Create Catalog Model
	 *
	 * @param PDO $db
	 */
	public function __construct( PDO $db ) {
		$this->db = $db;
	}

	/**
	 * Function get() : Get Items of catalog, per page.
	 *
	 * @param int $page
	 * @param int $perPage
	 * @param int
	 *
	 * @return array
	 */
	public function getAll( int $page, int $perPage, &$totalCount ) {
		return CommonPdo::getAll( $this->db, self::TABLE, $page, $perPage, $totalCount );
	}

	/**
	 * Function getById() : Get Product by Id
	 *
	 * @param int $id
	 *
	 * @return array
	 */
	public function getById( int $id ) {
		$stmt = $this->db->prepare( 'SELECT * FROM ' . SELF::TABLE . ' where id = ? LIMIT 1' );

		if ( $stmt->execute( [ $id ] ) ) {
			return $stmt->fetch( PDO::FETCH_ASSOC );
		}

		return [];
	}

	/**
	 * Function getByIds() : Get Product by Ids
	 *
	 * @param array $ids
	 *
	 * @return []
	 */
	public function getByIds( array $ids ) {
		$qMarks = implode( ',', str_split( str_repeat( '?', count( $ids ) ) ) );

		$stmt = $this->db->prepare( "SELECT id,name,price FROM " . SELF::TABLE . " WHERE id IN ({$qMarks})" );

		if ( $stmt->execute( $ids ) ) {
			return $stmt->fetchAll( PDO::FETCH_ASSOC );
		}

		return [];
	}
}
