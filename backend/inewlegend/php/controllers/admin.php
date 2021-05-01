<?php
/**
 * @file    : controllers/cart.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 */

namespace Controllers;

class Admin {

	function install( $database_host = null, $database_user = null, $database_password = null, $database_name = 'shop_catalog', $skip_create = false ) {
		if ( null === $database_host) {
			return '[syntax]: ' . $_SERVER["PATH_INFO"] . '/[db_host]/[db_user]/[db_password]/[db_name]';
		}

		try {
			if ( \Config\Database::IS_CONFIGURED ) {
				throw new \Exception( 'Install is already configured.' );
			}

			$database = new \Services\Database( $database_host, $database_user, $database_password );

			if ( ! $skip_create ) {
				$database->createDatabase( $database_name );
			}

			$database->useDatabase( $database_name );

			$catalog = new \Models\Catalog( $database->getConnection() );
			$catalog->createTable();
			$catalog->insertMock();

			$database_config_path = __DIR__  .'/../config/database.php';
			$database_config_content = file_get_contents( $database_config_path );

			$database_config_content = str_replace( '%DB_HOST%', $database_host, $database_config_content );
			$database_config_content = str_replace( '%DB_NAME%', $database_name, $database_config_content );
			$database_config_content = str_replace( '%DB_USER%', $database_user, $database_config_content );
			$database_config_content = str_replace( '%DB_PASS%', $database_password, $database_config_content );
			$database_config_content = str_replace( 'const IS_CONFIGURED = false;', 'const IS_CONFIGURED = true;', $database_config_content );

			file_put_contents( $database_config_path, $database_config_content );
		} catch ( \Exception $e ) {
			return $e;
		}

		return 'Success';
	}
}
