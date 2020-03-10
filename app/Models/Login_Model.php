<?php 

	class Login_Model extends Model
	{ 
    
        public function login()
		{   
            
			$email = $this->ctr->post('email');
			$password = $this->ctr->post('password');
			$rememberMe =  $this->ctr->post('rememberMe');
			$time = time(); 
			$check = isset($_POST['rememberMe'])?$_POST['rememberMe']:'';
			if (empty($email) || empty($password)) {
			Flasher::setFlash('<b>Form</b> must be filled', 'danger');
			return false;
			} else { 

			$where = [
			'email' => $email
			];
			$where2 = [
			'username' => $email
			];
			
			
				if (date('d-m-Y H:i:s') < Session::get('_login_again')) {
					Session::unset();
				Flasher::setFlash('Please login in <span id="timer" style="font-weight:bold;"></span>', 'danger');
				return false;
				} else {
				
					if (Session::get('_fail_login') >= 3) {
					Session::set('_login_again', date('d-m-Y H:i:s', time() + (60*10) ));
					Session::unset('_fail_login');
					Session::unset();
					Flasher::setFlash('Please login in <span id="timer" style="font-weight:bold;"></span>', 'danger');
					return false;
					} else {
						
						if ($this->db->table('investor')->countRows($where) > 0) {
					
						$dataUsers = $this->db->query('
								SELECT * FROM investor
								WHERE email = "'.$email.'" 
							');
						$dataUsers = $this->db->single();  					

						if (password_verify($password, $dataUsers['password']) == true) {
					
							$time = time();
									$value = encrypt($dataUsers['id_investor']);		

									if($check) {        
									setcookie("auth", $value, $time + 3600 * 24 *30);
									setcookie("cookieUsername", $email, $time + 3600 * 24 *30);
									}
								Session::unset();
								Session::set('users',$dataUsers['id_investor']);  

								$this->save_device($dataUsers['id_investor']);			
								return $this->db->rowCount(); 
							} else {
						
								Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
								Session::set('_fail_login', Session::get('_fail_login')+1);
								return false;
							}
						} else if ($this->db->table('investor')->countRows($where2) > 0) {
							
							$dataUsers = $this->db->query('
							SELECT * FROM investor
							WHERE username = "'.$email.'" 
							');
							$dataUsers = $this->db->single();  
							
							if (password_verify($password, $dataUsers['password']) == true) {
								$time = time();
									$value = encrypt($dataUsers['id_investor']);		

									if($check) {        
									setcookie("auth", $value, $time + 3600 * 24 *30);
									setcookie("cookieUsername", $email, $time + 3600 * 24 *30);
									}
								
								Session::unset();
								Session::set('users',$dataUsers['id_investor']);  
								

								$this->save_device($dataUsers['id_investor']);			
								return $this->db->rowCount(); 
							} else {
								Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
								Session::set('_fail_login', Session::get('_fail_login')+1);
								return false;
							}
						}else if ($this->db->table('admin')->countRows($where) > 0) {
							
					
							$dataAdmin = $this->db->query('
							SELECT * FROM admin
							WHERE level = "admin" AND email = "'.$email.'" 
							');
							$dataAdmin = $this->db->single();  
							if ($dataAdmin == true) {
								if (password_verify($password, $dataAdmin['password']) == true) {
					
								Session::unset();
								Session::set('admin',$dataAdmin['id_admin']);  
									
								return $this->db->rowCount(); 
								} else {
									Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
									Session::set('_fail_login', Session::get('_fail_login')+1);
									return false;
								}
							}
							$dataSuperAdmin = $this->db->query('
							SELECT * FROM admin
							WHERE level = "superadmin" AND email = "'.$email.'" 
							');
							$dataSuperAdmin = $this->db->single();  
							if ($dataSuperAdmin == true) {
								if (password_verify($password, $dataSuperAdmin['password']) == true) {
								Session::unset();
								Session::set('superadmin',$dataSuperAdmin['id_admin']);  
									
								return $this->db->rowCount(); 
								} else {
									Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
									Session::set('_fail_login', Session::get('_fail_login')+1);
									return false;
								}
							}
							
						}else if ($this->db->table('admin')->countRows($where2) > 0) {
					
							$dataAdmin = $this->db->query('
							SELECT * FROM admin
							WHERE level = "admin" AND username = "'.$email.'" 
							');
							$dataAdmin = $this->db->single();  
							
							if ($dataAdmin == true) {
								if (password_verify($password, $dataAdmin['password']) == true) {
							
									Session::unset();
									Session::set('admin',$dataAdmin['id_admin']);  
										
									return $this->db->rowCount(); 
								} else {
									Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
									Session::set('_fail_login', Session::get('_fail_login')+1);
									return false;
								}
							}
							$dataSuperAdmin = $this->db->query('
							SELECT * FROM admin
							WHERE level = "superadmin" AND username = "'.$email.'" 
							');
							$dataSuperAdmin = $this->db->single();  
					
							
							if ($dataSuperAdmin == true) {
							
								if (password_verify($password, $dataSuperAdmin['password']) == true) {
								Session::unset();
								Session::set('superadmin',$dataSuperAdmin['id_admin']);  
									
								return $this->db->rowCount(); 
								} else {
									Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
									Session::set('_fail_login', Session::get('_fail_login')+1);
									return false;
								}
							}

						} else {
							
							Flasher::setFlash('Your <b>account</b> has not been registered', 'danger');
							Session::set('_fail_login', Session::get('_fail_login')+1);
							return false; 
						}	
				}

				}
			}
					
		}
		// Encrypt cookie
		public function encryptCookie( $value ) {
			$key = 'youkey';
			$newvalue = base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256, md5( $key ), $value, MCRYPT_MODE_CBC, md5( md5( $key ) ) ) );
			return( $newvalue );
		}
		public function save_device($access)
		{
			$dataLog = [
				'id_investor' => $access,
				'time' => date('Y-m-d H:i:s'),
				'device' => Detect::deviceType(),
				'ip' => Detect::ip(),
				'os' => Detect::os(),
				'browser' => Detect::browser(),
				'brand' => Detect::brand()
			];
		
			$this->db->table('access_logs')->insert($dataLog); 
		}
		
    }
