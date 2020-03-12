<?php 

class Datamanagement_Model extends Model
{
    public function select(){
        $select = $this->db->query("SELECT * FROM admin WHERE level = 'admin' ORDER BY date DESC "); 
        $select = $this->db->resultSet();
        return $select;
    }
    public function Insert(){
        $buatkode       = $this->ctr->buatKode('admin','ADM','id_admin');
        $username       = $this->ctr->post('username');
        $email          = $this->ctr->post('email');
        $password       = $this->ctr->post('password');
        $rePassword     = $this->ctr->post('repassword'); 
        $gender         = $this->ctr->post('gender'); 
        $tanggal        = $this->ctr->post('tanggal'); 
        $bulan          = $this->ctr->post('bulan'); 
        $tahun          = $this->ctr->post('tahun'); 
        $position       = $this->ctr->post('position'); 
        $alamat         = $this->ctr->post('alamat'); 
        $tangal_lahir   = $tanggal ."-". $bulan. "-". $tahun ;

        if (!empty($_FILES['img']['name'])) {
            $gambar         = $_FILES['img']['name'];
            $source         = $_FILES['img']['tmp_name'];

            $folder         = paths('path_portal_Datamanagement'); 

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
            $upload     = move_uploaded_file($source, $folder.$namaFileBaru);
            
            if ($upload  == false ) {
                Flasher::setFlashSweet('Failed','Image system error failed to send','error'); 
                return false;
            }
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
                    if ($this->db->table('admin')->countRows($select) > 0) {
                        Flasher::setFlashSweet('Failed','Email is already in use','error'); 
                        return false;
                    }
                    if ($this->db->table('investor')->countRows($select) > 0) {
                        Flasher::setFlashSweet('Failed','Email is already in use','error'); 
                        return false;
                    }
                    $select2 = [
                        'username' => $username
                    ];
                    if ($this->db->table('admin')->countRows($select2) > 0) {
                        Flasher::setFlashSweet('Failed','Username is already in use','error'); 
                        return false;
                    }
                    if ($this->db->table('investor')->countRows($select2) > 0) {
                        Flasher::setFlashSweet('Failed','Username is already in use','error'); 
                        return false;
                    }
                    $data = [
                        'id_admin'      => $buatkode,
                        'username'      => $username,
                        'password'      => $passHash,
                        'email'         => $email,
                        'gender'        => $gender,
                        'image'         => $namaFileBaru,
                        'date'          => $tangal_lahir,
                        'position'      => $position,
                        'address'       => $alamat,
                        'level'         => "admin"
                    ];

                    $this->db->table('admin')->insert($data);
                    $id 	= Session::get('superadmin');
                        $dataActivity = [
                            "id_admin"	 => $id,
                            "name_table" => "admin",
                            "id"		 => $buatkode,
                            "activity" 	 => "INSERTED",
                            "keterangan" => "MENAMBAHKAN AKUN <b>".strtoupper($username)."</b> / ADMIN BARU",
                            "date"		 => date("Y-m-d H:i:s")
                        ];
                
                        $activity = $this->db->table('history_access_logs')->insert($dataActivity);
                        if ($activity == false) {
                            Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                            return false;
                        }
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