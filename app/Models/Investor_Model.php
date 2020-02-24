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
            $id_ktp         = $this->ctr->post('id_ktp'); 
            $id_npwp         = $this->ctr->post('id_npwp'); 

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

            $gambar2         = $_FILES['img_ktp']['name'];
            $source2         = $_FILES['img_ktp']['tmp_name'];
        
            
            $folder2         = paths('path_portal_Investor'); 
        
            $ekstensiGambarValid2 = ['jpg','jpeg','png'];
            $ekstensiGambar2 = explode('.', $gambar2);
            $ekstensiGambar2 = strtolower(end($ekstensiGambar2));

            if ( !in_array($ekstensiGambar2, $ekstensiGambarValid2)) {
            Flasher::setFlashSweet('Failed','Format gambar anda tidak mendukung !','error'); 
            return false;
            }
            $namaFileBaru2 = uniqid();
            $namaFileBaru2 .= '.';
            $namaFileBaru2 .= $ekstensiGambar;
            //  menggabungkan foto yang tadinya dipecah
            //  Memindahkan foto
            $upload2 = move_uploaded_file($source2, $folder2.$namaFileBaru2);
            
            if ($upload2 == false ) {
                Flasher::setFlashSweet('Failed','Image system error failed to send','error'); 
                return false;
            }
            
            $gambar3         = $_FILES['img_npwp']['name'];
            $source3         = $_FILES['img_npwp']['tmp_name'];
        
            
            $folder3         = paths('path_portal_Investor'); 
        
            $ekstensiGambarValid3 = ['jpg','jpeg','png'];
            $ekstensiGambar3 = explode('.', $gambar3);
            $ekstensiGambar3 = strtolower(end($ekstensiGambar3));

            if ( !in_array($ekstensiGambar3, $ekstensiGambarValid3)) {
            Flasher::setFlashSweet('Failed','Format gambar anda tidak mendukung !','error'); 
            return false;
            }
            $namaFileBaru3 = uniqid();
            $namaFileBaru3 .= '.';
            $namaFileBaru3 .= $ekstensiGambar3;
            //  menggabungkan foto yang tadinya dipecah
            //  Memindahkan foto
            $upload3 = move_uploaded_file($source3, $folder3.$namaFileBaru3);
            
            if ($upload3 == false ) {
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
                                'address'       => $alamat,
                                'image_ktp'     => $namaFileBaru2,
                                'id_ktp'        => $id_ktp,
                                'image_npwp'    => $namaFileBaru3,
                                'id_npwp'       => $id_npwp
                            ];
                        
                            
                            
                            // // $data2 = [
                            // //     'id_admin'      => "tes",
                            // //     'id_investor'   => $buatkode,
                            // //     'activity'      => "CreateAt",
                            // //     'date'          => date('d F Y, H:i:s')
                            // // ];  
                            
                            
                            $this->db->table('investor')->insert($data);
                            $id 	= Session::get('admin');
                            $dataActivity = [
                                "id_admin"	 => $id,
                                "name_table" => "investor",
                                "id"		 => $buatkode,
                                "activity" 	 => "INSERTED",
                                "keterangan" => "MENAMBAHKAN AKUN INVESTOR BARU",
                                "date"		 => date("d-m-Y H:i:s")
                            ];
                        
                            $activity = $this->db->table('history_access_logs')->insert($dataActivity);
                            if ($activity == false) {
                                Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                                return false;
                            }
                            // // $this->db->table('activity_logs')->insert($data2);
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
            $nik            = $this->ctr->post('nik');
            $npwp           = $this->ctr->post('npwp');
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
                }else if ($upload == true ) {
            
					$where = [
						'id_investor'	=> $id
					];
					$sql = $this->db->table('investor')->selectWhere($where);
					if (!empty($sql['image'])) 
					{
					unlink( paths('path_portal_Investor').$sql['image'] );
					}
					
				}
			}else{
					$where = [
						'id_investor'	=> $id
                    ];
                    $sql = $this->db->table('investor')->selectWhere($where);
                    $namaFileBaru = $sql['image'];
                
            } 
            // KTP   
            if (!empty($_FILES['img_ktp']['name'])) {

                $gambar_ktp  = $_FILES['img_ktp']['name'];
                $source_ktp  = $_FILES['img_ktp']['tmp_name'];

                $folder_ktp  = paths('path_portal_Investor'); 

                $ekstensiGambarValid_ktp = ['jpg','jpeg','png','gif'];
                $ekstensiGambar_ktp = explode('.', $gambar_ktp);
                $ekstensiGambar_ktp = strtolower(end($ekstensiGambar_ktp));
                
			
                if ( !in_array($ekstensiGambar_ktp, $ekstensiGambarValid_ktp)) {
                    Flasher::setFlashSweet('Failed','Your image format does not support!', 'error');
                return false;
                }

                $namaFileBaru_ktp = uniqid();
                $namaFileBaru_ktp .= '.';
                $namaFileBaru_ktp .= $ekstensiGambar_ktp;
                //  menggabungkan foto yang tadinya dipecah
                //  Memindahkan foto
                $upload_ktp = move_uploaded_file($source_ktp, $folder_ktp.$namaFileBaru_ktp);
                if ($upload_ktp == false ) {
                Flasher::setFlashSweet('Failed','Image system error failed to send','error'); 
                return false;
                }else if ($upload_ktp == true ) { 
					$where = [
						'id_investor'	=> $id
					];
					$sql = $this->db->table('investor')->selectWhere($where);
					if (!empty($sql['image_ktp'])) 
					{
					unlink( paths('path_portal_Investor').$sql['image_ktp'] );
					}
					
				}
			}else{
					$where = [
						'id_investor'	=> $id
					];
					$sql = $this->db->table('investor')->selectWhere($where);
                    $namaFileBaru_ktp = $sql['image_ktp'];
            
                }   
                

            // NPWP
            if (!empty($_FILES['img_npwp']['name'])) {
                $gambar_npwp  = $_FILES['img_npwp']['name'];
                $source_npwp  = $_FILES['img_npwp']['tmp_name'];

                $folder_npwp  = paths('path_portal_Investor'); 

                $ekstensiGambarValid_npwp = ['jpg','jpeg','png','gif'];
                $ekstensiGambar_npwp = explode('.', $gambar_npwp);
                $ekstensiGambar_npwp = strtolower(end($ekstensiGambar_npwp));
                
			
                if ( !in_array($ekstensiGambar_npwp, $ekstensiGambarValid_npwp)) {
                    Flasher::setFlashSweet('Failed','Your image format does not support!', 'error');
                return false;
                }

                $namaFileBaru_npwp = uniqid();
                $namaFileBaru_npwp .= '.';
                $namaFileBaru_npwp .= $ekstensiGambar_npwp;
                //  menggabungkan foto yang tadinya dipecah
                //  Memindahkan foto
                $upload_npwp = move_uploaded_file($source_npwp, $folder_npwp.$namaFileBaru_npwp);
                if ($upload_npwp == false ) {
                Flasher::setFlashSweet('Failed','Image system error failed to send','error'); 
                return false;
                }else if ($upload_npwp == true ) { 
					$where = [
						'id_investor'	=> $id
					];
					$sql = $this->db->table('investor')->selectWhere($where);
					if (!empty($sql['image_npwp'])) 
					{
					unlink( paths('path_portal_Investor').$sql['image_npwp'] );
					}
					
				}
			}else{
					$where = [
						'id_investor'	=> $id
					];
					$sql = $this->db->table('investor')->selectWhere($where);
                    $namaFileBaru_npwp = $sql['image_npwp'];
            }   
                
            $data = [
                'username' 			=> $username,
                'email' 		    => $email,
                'gender'            => $gender,
                'image'             => $namaFileBaru,
                'address' 	 		=> $alamat,
                'image_ktp' 	 	=> $namaFileBaru_ktp,
                'id_ktp' 	 		=> $nik,
                'image_npwp' 	 	=> $namaFileBaru_npwp,
                'id_npwp' 	 	    => $npwp
                ];

                $where = [
                'id_investor' => $id
                ];	
                $id_admin 	= Session::get('admin');
                    $dataActivity = [
                        "id_admin"	 => $id_admin,
                        "name_table" => "investor",
                        "id"		 => $id,
                        "activity" 	 => "UPDATED",
                        "keterangan" => "MENGUBAH AKUN INVESTOR ",
                        "date"		 => date("d-m-Y H:i:s")
                    ];
                
                $activity = $this->db->table('history_access_logs')->insert($dataActivity);
                if ($activity == false) {
                    Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                    return false;
                }
			return $this->db->table('investor')->update($data ,$where);
		
        }
        public function change_password($id)
        {
            $password_lama  = $this->ctr->post('current_password');
            $password       = $this->ctr->post('password');
            $rePassword     = $this->ctr->post('confirm_password'); 
            $investor 		= $this->db->table('investor')->where("id_investor", $id);

        
            if ( password_verify($password_lama, $investor['password']) == true ) {
                if ( md5($password) == md5($rePassword) ) {
                    if (strlen($password) >= 8) { 
                        if ( password_verify($password, $investor['password']) == true ) {
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
                                    'id_investor' => $id
                                ];
                                return $this->db->table('investor')->update($data ,$where);
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