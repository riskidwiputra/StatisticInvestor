<?php 

	class Investor_Model extends Model
	{ 
        public function select()
        {
            $select = $this->db->table('investor')->selectAll(); 
			return $select;
        }
        public function selectUpdate($id)
        {
            $data =[
                'id_investor' => $id
            ];
            $select = $this->db->table('investor')->selectWhere($data); 
			return $select;
        }
        public function insert()
		{ 
    
            $hash			= filter_var(str_replace('/' , '', base64_encode(md5(rand(0,999999999)).sha1(rand(0,999999999)))), FILTER_SANITIZE_URL);
            $buatkode       = $this->ctr->buatKode('investor','IVR','id_investor');
            $username       = $this->ctr->post('username');
            $email          = $this->ctr->post('email');
            $password       = $this->ctr->post('password');
            $rePassword     = $this->ctr->post('repassword'); 
            $jenis_kelamin  = $this->ctr->post('gender'); 
            $alamat         = $this->ctr->post('alamat'); 

            $gambar         = $_FILES['img']['name'];
            $source         = $_FILES['img']['tmp_name'];
        
            
            $folder         = paths('path_portal_Investor'); 
        
            $ekstensiGambarValid = ['jpg','jpeg','png'];
            $ekstensiGambar = explode('.', $gambar);
            $ekstensiGambar = strtolower(end($ekstensiGambar));

            if ( !in_array($ekstensiGambar, $ekstensiGambarValid)) {
            Flasher::setFlashSweet('Failed','Format gambar anda tidak mendukung !','error'); 
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
            }
            
    
            $passHash = password_hash($rePassword, PASSWORD_DEFAULT);
            if (strlen($password) >= 8) { 
                if(preg_match("/^[a-zA-Z0-9]*$/", $password)){
                    Flasher::setFlashSweet('Failed','<b> Passwords must be a combination of letters, numbers and symbols, and cannot use spaces','error'); 
                    return false;
                }else{
                    
                        if (password_verify($password, $passHash) == true) {
                            $select = [
                                'email' => $email
                            ];
                            if ($this->db->table('investor')->countRows($select) > 0) {
                                Flasher::setFlashSweet('Failed','Email is already in use','error'); 
                                return false;
                            }
                            $select2 = [
                                'username' => $username
                            ];
                            if ($this->db->table('investor')->countRows($select2) > 0) {
                                Flasher::setFlashSweet('Failed','Username is already in use','error'); 
                                return false;
                            }
                    
                            $data = [
                                'id_investor'  => $buatkode,
                                'username'      => $username,
                                'password'      => $passHash,
                                'email'         => $email,
                                'gender'        => $jenis_kelamin,
                                'image'         => $namaFileBaru,
                                'address'        => $alamat
                            ];
                            
                            
                            // $data2 = [
                            //     'id_admin'      => "tes",
                            //     'id_investor'   => $buatkode,
                            //     'activity'      => "CreateAt",
                            //     'date'          => date('d F Y, H:i:s')
                            // ];  
                            
                            
                            $this->db->table('investor')->insert($data);
                            // $this->db->table('activity_logs')->insert($data2);
                            return $this->db->rowCount();

                
                        
                        } else {
                            Flasher::setFlashSweet('Failed','<b> Confirm Password </b> must be the same','error'); 
                            return false;  
                        }
                    }
            } else {
            Flasher::setFlashSweet('Failed','<b> Password </b> must be at least 8 digits long','error'); 
            return false;
			} 
        }
        public function delete($id)
        {
        $data = [
            'id_investor' => $id
        ];
        $sql = $this->db->table('investor')->selectWhere($data);
        unlink( paths('path_portal_Investor').$sql['image'] );
        return $this->db->table('investor')->delete($data);
        }
        public function update($id)
		{
			$username      	= $this->ctr->post('username');
			$email 		    = $this->ctr->post('email');
			$gender    	    = $this->ctr->post('gender');
			$alamat		    = $this->ctr->post('alamat');
		
			if (!empty($_FILES['img']['name'])) {
			$gambar  = $_FILES['img']['name'];
			$source  = $_FILES['img']['tmp_name'];

			$folder  = paths('path_portal_Investor'); 

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
            }
			
		
			
            $data = [
            'username' 			=> $username,
            'email' 		    => $email,
            'gender'            => $gender,
            'image'				=> $namaFileBaru,
            'address' 	 		=> $alamat
            ];
			$where = [
			'id_investor' => $id
            ];	
            
			$sql = $this->db->table('investor')->selectWhere($where);
			unlink( paths('path_portal_Investor').$sql['image'] );
			return $this->db->table('investor')->update($data ,$where);
			}else{	
        
            $data = [
                'username' 			=> $username,
                'email' 		    => $email,
                'gender'            => $gender,
                'address' 	 		=> $alamat
                ];

            $where = [
                'id_investor' => $id
                ];	
			return $this->db->table('investor')->update($data ,$where);
			}
        }
    }