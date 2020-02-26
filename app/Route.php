<?php

	// Ex:
	// Route::get('URL', 'NameController@method'); 				Jika data yang dikirim berbentuk GET
	// Route::post('URL', 'NameController@method');         	Jika data yang dikirim berbentuk post

	// GET
	// Pages
	Route::get('/', 								'HomeController@Index');
	Route::get('/login', 							'AuthController@IndexLogin');
	Route::get('/logout', 							'AuthController@Logout');

	//
	Route::get('/investor', 						'InvestorController@Investor');
	Route::get('/add-investor', 					'InvestorController@Add_Investor');
	Route::get('/dalete-investor/{id}', 			'InvestorController@Delete');
	Route::get('/update-investor/{id}', 			'InvestorController@SelectUpdate');
	Route::get('/change-investor/{id}', 			'InvestorController@ChangePassword');


	// Saham
	Route::get('/saham', 							'SahamController@Saham');
	Route::get('/add-saham', 						'SahamController@Add_Saham');
	Route::get('/edit-saham/{id}', 					'SahamController@Edit_Saham');

	// Investasi 
	Route::get('/investasi', 						'InvestasiController@Investasi');
	
	




	// lOGIN 
	Route::post('/login', 							'AuthController@Login');

	// INVESTOR
	Route::post('/insert-investor', 				'InvestorController@Insert');
	Route::post('/update-investor/{id}', 			'InvestorController@Update');
	Route::post('/change-password/{id}', 			'InvestorController@Change_Password');

	// SAHAM
	Route::post('/insert-saham', 					'SahamController@Insert');
	Route::post('/edit-saham/{id}', 				'SahamController@Edit');

	// INVESTASI
	Route::post('/insert-investasi', 				'InvestasiController@Insert');
	Route::post('/insert-transfer-investasi', 		'InvestasiController@Insert_Transfer');

	//NEWS
	Route::get('/news', 							'NewsController@Index');
	Route::get('/addnewsdaily', 					'NewsController@Add_Daily');
	Route::get('/addnewsmonthly', 					'NewsController@Add_Monthly');
	
	// activity Log
	Route::get('/activity-log', 					'AuthController@activity_log');
	Route::get('/history_transfer', 				'AuthController@history_transfer');


	Route::post('/get-saham', 						'InvestasiController@Get_Saham');
	Route::post('/get-harga/{id}', 					'InvestasiController@Get_Harga');
	Route::post('/get-transfer', 					'InvestasiController@Get_Lembar');
	Route::post('/get-harga-transfer/{id}', 		'InvestasiController@Get_Transfer');



	