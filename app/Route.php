<?php

	// Ex:
	// Route::get('URL', 'NameController@method'); 				Jika data yang dikirim berbentuk GET
	// Route::post('URL', 'NameController@method');         	Jika data yang dikirim berbentuk post

	// GET
	// Pages
	Route::get('/', 								'HomeController@Index');
	Route::get('/login', 							'AuthController@IndexLogin');
	Route::get('/logout', 							'AuthController@Logout');
	Route::get('/investor', 						'InvestorController@Investor');
	Route::get('/add-investor', 					'InvestorController@Add_Investor');

	// Saham
	Route::get('/saham', 							'SahamController@Saham');
	Route::get('/add-saham', 						'SahamController@Add_Saham');
	Route::get('/edit-saham/{id}', 					'SahamController@Edit_Saham');

	// Investasi 
	Route::get('/investasi', 						'InvestasiController@Investasi');
	Route::get('/get-harga/{id}', 					'InvestasiController@Get_Harga');
	





	Route::post('/login', 							'AuthController@Login');
	
	Route::post('/insert-investor', 				'InvestorController@Insert');
	Route::post('/insert-saham', 					'SahamController@Insert');
	Route::post('/edit-saham/{id}', 				'SahamController@Edit');

	Route::post('/insert-investasi', 				'InvestasiController@Insert');




	Route::post('/get-saham', 						'InvestasiController@Get_Saham');




	