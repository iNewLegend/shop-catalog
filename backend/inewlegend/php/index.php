<?php
use Core\Core;
use Modules\Command;

spl_autoload_register( function ( string $class ) {
	static $sourcePath = __DIR__ . DIRECTORY_SEPARATOR;

	$classParts = explode( '\\', $class );
	$dir = strtolower( array_shift( $classParts ) );
	$file = strtolower( array_shift( $classParts ) );

	$filePath = $sourcePath . $dir . DIRECTORY_SEPARATOR . $file . '.php';

	if ( file_exists( $filePath ) ) {
		require $filePath;
	}
} );


ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

set_error_handler( function ( $errno, $errstr, $errfile, $errline ) {
	$dump = [
		'error' => true,
		'global' => true,
		'message' => $errstr,
		'number' => $errno,
		'file' => $errfile,
		'line' => $errline,
	];

	echo json_encode( $dump );

	exit();
}, E_ALL );

header( 'Access-Control-Allow-Origin: http://localhost:8080' );
header( 'Access-Control-Allow-Headers:X-Request-With, Content-Type' );
header( 'Access-Control-Allow-Credentials: true' ); // for cookies

header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH' );

if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
	exit();
}

$cmd = ltrim( $_SERVER['REQUEST_URI'], '/' );

if ( $cmd == 'phpinfo' ) {
	phpinfo();
	exit();
}

$command = new Command();

if ( in_array( $_SERVER['REQUEST_METHOD'], [ 'POST', 'PATCH' ] ) ) {
	$command->parse( $cmd );
	$command->setParameters( (array) json_decode( file_get_contents( 'php://input' ) ) );
} else if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
	$command->parse( $cmd );
}

try {
	$core = new Core( $command );
	$core->execute();
} catch ( Exception $e ) {
	exit( json_encode( [
		'error' => true,
		'global' => true,
		'message' => (string) $e,
	] ) );
}
