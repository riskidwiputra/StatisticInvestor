<?php

	// Ex:
	// Route::get('URL', 'NameController@method'); 				Jika data yang dikirim berbentuk GET
	// Route::post('URL', 'NameController@method');         	Jika data yang dikirim berbentuk post

	// GET
	// Pages
	Route::get('/', 								'HomeController@Index');
	Route::get('/login', 							'AuthController@IndexLogin');
	Route::get('/logout', 							'AuthController@Logout');
	Route::get('/error', 							'AuthController@Error');

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
	Route::get('/news/{id}', 						'NewsController@Single_News');
	Route::get('/addnewsdaily', 					'NewsController@Add_Daily');
	Route::get('/addnewsmonthly', 					'NewsController@Add_Monthly');
	Route::get('/upload/{id}', 						'NewsController@Upload');
	Route::get('/dalete-news/{id}', 				'NewsController@Delete');
	Route::get('/update-news/{id}', 				'NewsController@SelectUpdate');
	Route::get('/news-daily/{id}', 					'NewsController@Pagination_Daily');
	Route::get('/news-monthly/{id}', 				'NewsController@Pagination_Monthly');

	Route::post('/insert-news', 					'NewsController@Insert');
	Route::post('/update-news/{id}', 				'NewsController@Update');
	Route::post('/add-content-image', 				'NewsController@Upload');


	// Report
	Route::get('/report', 							'ReportController@Report');
	Route::get('/add-report', 						'ReportController@Add_Report');
	Route::get('/dalete-report/{id}', 				'ReportController@Delete');
	Route::get('/download-report/{id}', 			'ReportController@Download');

	Route::post('/insert-report', 					'ReportController@Insert');
	// activity Log
	Route::get('/activity-log', 					'AuthController@activity_log');
	Route::get('/history_transfer', 				'AuthController@history_transfer');

	// Data Management 
	Route::get('/data-management', 					'ManagementController@Management');
	Route::get('/add-datamanagement', 				'ManagementController@Addmanagement');

	Route::post('/insert-datamanagement', 			'ManagementController@Insert');

	Route::get('/profile', 							'ProfileController@Profile');
	Route::get('/update-profile', 					'ProfileController@Update_Profile');
	Route::get('/change-password_profile/{id}', 	'ProfileController@Change_Password');
	Route::post('/update-profile/{id}', 			'ProfileController@Update');
	Route::post('/change-password_profile/{id}', 	'ProfileController@Change_Password_profile');
	
	Route::post('/get-saham', 						'InvestasiController@Get_Saham');
	Route::post('/get-harga/{id}', 					'InvestasiController@Get_Harga');
	Route::post('/get-transfer', 					'InvestasiController@Get_Lembar');
	Route::post('/get-harga-transfer/{id}', 		'InvestasiController@Get_Transfer');



	