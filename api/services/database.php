<?php
/**
 * @file    : services/database.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 */

namespace Services;

use PDO;

class Database {

	/**
	 * Self Instance
	 *
	 * @var \Services\Database
	 */
	private static $instance;

	/**
	 * PDO
	 *
	 * @var \PDO
	 */
	private $pdo;

	/**
	 * Function __construct() : Create Database Service
	 */
	private function __construct() {
		$host = \Config\Database::HOST;
		$name = \Config\Database::NAME;
		$user = \Config\Database::USERNAME;
		$pass = \Config\Database::PASSWORD;

		$this->pdo = new PDO( "mysql:host={$host};dbname={$name}", $user, $pass, [ PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'" ] );
	}

	/**
	 * function getInstance() : Return self instance
	 *
	 * @return \Services\Database
	 */
	public static function getInstance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * function getPDO() : Get the pdo connection
	 *
	 * @return \PDO
	 */
	public function getPDO() {
		return $this->pdo;
	}
}
