<?php 

	class Login_Model extends Model
	{ 
    
        public function login()
		{   
            
			$email = $this->ctr->post('email');
			$password = $this->ctr->post('password');
		
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
				
				Flasher::setFlash('Please login in <span id="timer" style="font-weight:bold;"></span>', 'danger');
				return false;
				} else {
				
					if (Session::get('_fail_login') >= 3) {
					Session::set('_login_again', date('d-m-Y H:i:s', time() + (60*10) ));
					Session::unset('_fail_login');
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
							WHERE email = "'.$email.'" 
							');
							$dataAdmin = $this->db->single();  
							
							
							if (password_verify($password, $dataAdmin['password']) == true) {

								Session::unset();
								Session::set('admin',$dataAdmin['id_admin']);  
									
								return $this->db->rowCount(); 
							} else {
								Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
								Session::set('_fail_login', Session::get('_fail_login')+1);
								return false;
							}
						}else if ($this->db->table('admin')->countRows($where2) > 0) {
							
							$dataAdmin = $this->db->query('
							SELECT * FROM admin
							WHERE username = "'.$email.'" 
							');
							$dataAdmin = $this->db->single();  
							
							
							if (password_verify($password, $dataAdmin['password']) == true) {

								Session::unset();
								Session::set('admin',$dataAdmin['id_admin']);  
									
								return $this->db->rowCount(); 
							} else {
								Flasher::setFlash('Your <b>password</b> is incorrect', 'danger');
								Session::set('_fail_login', Session::get('_fail_login')+1);
								return false;
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
		public function save_device($access)
		{
			$dataLog = [
				'id_investor' => $access,
				'time' => date('d-m-Y H:i:s'),
				'device' => Detect::deviceType(),
				'ip' => Detect::ip(),
				'os' => Detect::os(),
				'browser' => Detect::browser(),
				'brand' => Detect::brand()
			];
		
			$this->db->table('access_logs')->insert($dataLog); 
		}
    }
