<?php 

	class Profile_Model extends Model
	{ 
        public function update($id)
		{
			$username     	= $this->ctr->post('username');
			$gender		    = $this->ctr->post('gender');
			$address		= $this->ctr->post('address');
			$email		    = $this->ctr->post('email');
			$position		= $this->ctr->post('position');


            if (!empty($_FILES['image']['name'])) {
			
                $gambar  = $_FILES['image']['name'];
                $source  = $_FILES['image']['tmp_name'];

                $folder  = paths('path_portal_Datamanagement'); 

                $ekstensiGambarValid = ['jpg','jpeg','png','gif'];
                $ekstensiGambar = explode('.', $gambar);
                $ekstensiGambar = strtolower(end($ekstensiGambar));
                
			
                if ( !in_array($ekstensiGambar, $ekstensiGambarValid)) {
                    Flasher::setFlashSweet('Failed','Your image format does not support!', 'error');
                return false;
                }

                $namaFileBaru = uniqid();
                $namaFileBaru .= '.';
                $namaFileBaru .= $ekstensiGambar;
                //  menggabungkan foto yang tadinya dipecah
                //  Memindahkan foto
                $upload = move_uploaded_file($source, $folder.$namaFileBaru);
                if ($upload == false ) {
                Flasher::setFlashSweet('Failed','Image system error failed to send','error'); 
                return false;
                }else if ($upload == true ) {
            
					$where = [
						'id_admin'	=> $id
					];
                    $sql = $this->db->table('admin')->selectWhere($where);
					if (!empty($sql['image'])) 
					{
					unlink( paths('path_portal_Datamanagement').$sql['image'] );
                    }	
                }
                
                $data = [
                    'username' 			=> $username,
                    'email' 		    => $email,
                    'gender'            => $gender,
                    'image'             => $namaFileBaru,
                    'position'          => $position,
                    'address'           => $address
                    ];
    
			}else{
                $data = [
                    'username' 			=> $username,
                    'email' 		    => $email,
                    'gender'            => $gender,
                    'position'          => $position,
                    'address'           => $address
                    ];
            } 
    
                $where = [
                'id_admin' => $id
                ];	
                $sql = $this->db->table('admin')->selectWhere($where);

        
                if(Session::check('superadmin') == true) {
                    $idadmin 	= Session::get('superadmin');
                }else{
                    $idadmin 	= Session::get('admin');
                }
                    $dataActivity = [
                        "id_admin"	 => $idadmin,
                        "name_table" => "news",
                        "id"		 => $id,
                        "activity" 	 => "UPDATED",
                        "keterangan" => "MENGUBAH DATA ". strtoupper($sql['username'])." DI ADMIN ",
                        "date"		 => date("Y-m-d H:i:s")
                    ];
                
                $activity = $this->db->table('history_access_logs')->insert($dataActivity);
                if ($activity == false) {
                    Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                    return false;
                }
			return $this->db->table('admin')->update($data ,$where);
		
        }
        public function change_password($id)
        {
            $password_lama  = $this->ctr->post('current_password');
            $password       = $this->ctr->post('password');
            $rePassword     = $this->ctr->post('confirm_password'); 
            $admin  		= $this->db->table('admin')->where("id_admin", $id);

        
            if ( password_verify($password_lama, $admin['password']) == true ) {
                if ( md5($password) == md5($rePassword) ) {
                    if (strlen($password) >= 8) { 
                        if ( password_verify($password, $admin['password']) == true ) {
                            Flasher::setFlash('Please use a password that has <b>not been</b> used', 'danger');
                            return false;
                        } else {
                            if(preg_match("/^[a-zA-Z0-9]*$/", $password)){
                                Flasher::setFlashSweet('Failed','<b> Passwords must be a combination of letters, numbers and symbols, and cannot use spaces','error'); 
                                return false;
                            }else{
                                $passHash = password_hash($password, PASSWORD_DEFAULT);
                                $data= [
                                    'password' => $passHash
                                ];
                                $where=[
                                    'id_admin' => $id
                                ];
                                return $this->db->table('admin')->update($data ,$where);
                            }
                        }
                    } else {
                        Flasher::setFlashSweet('Failed','<b> Password </b> must be at least 8 digits long','error'); 
                        return false;
                    } 

                } else {
                    Flasher::setFlashSweet('Failed','<b>Password Confirmation</b> must be the same', 'error');
                    return false;
                }
            } else {
                Flasher::setFlashSweet('Failed','Your current password is incorrect', 'error');
                return false;
            }
        }
    }