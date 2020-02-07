<?php

	// Ex:
	// Route::get('URL', 'NameController@method'); 				Jika data yang dikirim berbentuk GET
	// Route::post('URL', 'NameController@method');         	Jika data yang dikirim berbentuk post

	// GET
	// Pages
	Route::get('/', 								'HomeController@Index');
	Route::get('/login', 							'AuthController@IndexLogin');

	