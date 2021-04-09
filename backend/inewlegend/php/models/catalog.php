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

	public function createTable() {
		$name = self::TABLE;
		$query =
<<<EOT
			DROP TABLE IF EXISTS `$name`;
			CREATE TABLE `$name` (
			  `id` int(11) NOT NULL AUTO_INCREMENT,
			  `name` varchar(255) NOT NULL,
			  `price` decimal(10,2) DEFAULT NULL,
			  PRIMARY KEY (`id`)
			) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
EOT;
		return $this->db->exec( $query );
	}

	public function insertMock() {
		return $this->db->exec( "INSERT INTO `catalog` VALUES (1,'Pen',99.90),(2,'Clock',99.90),(3,'Watch',9.90),(4,'Sun Glasses',17.05),(5,'Flowers',59.90),(6,'Glass',59.90),(7,'Coca Cola',59.90),(8,'Pants',19.90),(9,'Red Roses',19.90),(10,'Black Roses',19.90),(11,'T-Shirt',19.90);" );
	}
}
