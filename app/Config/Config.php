<?php 

namespace App\Config;

class Config 
{
	public function __construct()
	{
		if (!(session_id())) session_start();
		date_default_timezone_set('Asia/Jakarta'); 
		ini_set( 'display_errors', 0 );


		define('DB_HOST', 'localhost');
		define('DB_USER', 'u8127881_investor');
		define('DB_PASS', 'Stream.investor');
		define('DB_NAME', 'u8127881_investor');
		
		
		define('CONTROLLER', 'home');
		define('METHOD', 'index');	
		define('__CONFIG', 'portal'); 
	}
}


new Config;
