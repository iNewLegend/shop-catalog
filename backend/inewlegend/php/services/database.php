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
	private $connection;

	/**
	 * Function __construct() : Create Database Service.
	 *
	 * @param string $host
	 * @param string $user
	 * @param string $pass
	 * @param null|false
	 */
	public function __construct( string $host, string $user, string $pass, $name = null ) {
		$this->connection = new PDO( "mysql:host={$host}", $user, $pass, [
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
		] );

		$this->connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		if ( $name ) {
			// Select the db.
			$this->useDatabase( $name );
		}
	}

	public function createDatabase( $name  ) {
		return $this->connection->exec( "CREATE DATABASE {$name}" );
	}

	public function useDatabase( $name ) {
		return $this->connection->exec( "USE {$name}" );
	}

	/**
	 * function getInstance() : Return self instance
	 *
	 * @return \Services\Database
	 */
	public static function getInstance() {
		if ( ! self::$instance ) {
			$host = \Config\Database::HOST;
			$user = \Config\Database::USERNAME;
			$pass = \Config\Database::PASSWORD;
			$name = \Config\Database::NAME;

			self::$instance = new self( $host, $user, $pass, $name );
		}

		return self::$instance;
	}

	/**
	 * function getConnection() : Get the `PDO` connection.
	 *
	 * @return \PDO
	 */
	public function getConnection() {
		return $this->connection;
	}

	public function getErrorInfo() {
		return json_encode( $this->getConnection()->errorInfo() );
	}
}
