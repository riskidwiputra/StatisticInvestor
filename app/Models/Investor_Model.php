<?php 

	class Investor_Model extends Model
	{ 
        public function select()
        {
            $select = $this->db->table('investor')->selectAll(); 
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
                    Flasher::setFlashSweet('Failed','<b> Passwords </b> must be a combination of letters and numbers, and may not use spaces ...!','error'); 
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
    }