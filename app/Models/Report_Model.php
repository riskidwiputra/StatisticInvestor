<?php 

	class Report_Model extends Model
	{ 
        public function select()
        {
            $select = $this->db->table('report')->selectAll(); 
			return $select;
        }
        
        public function insert()
		{ 
            $hash           = rand();
            $date           = date("Y-m-d H:i:s");
            $gambar         = $_FILES['img']['name'];
            $source         = $_FILES['img']['tmp_name'];
 
            

            $folder         = paths('path_portal_Report'); 

            $ekstensiGambarValid = ['pdf'];
            $ekstensiGambar = explode('.', $gambar);
            $ekstensiGambar = strtolower(end($ekstensiGambar));

            if ( !in_array($ekstensiGambar, $ekstensiGambarValid)) {
                Flasher::setFlashSweet('Failed','Your image format does not support it, you need to use the pdf format', 'error');
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
            $data = [
                'id_report' => $hash,
                'report'    => $namaFileBaru,
                'date'      => $date
            ];
            $this->db->table('report')->insert($data);
            $id_admin 	= Session::get('superadmin');
            $dataActivity = [
                "id_admin"	 => $id_admin,
                "name_table" => "Report",
                "id"		 => $hash,
                "activity" 	 => "INSERTED",
                "keterangan" => "MEMBUAT REPORT BULAN ".date('m'),
                "date"		 => date("Y-m-d H:i:s")
            ];
        
            $activity = $this->db->table('history_access_logs')->insert($dataActivity);
            return $this->db->rowCount();
        }
        public function delete($id)
        {
        $data = [
            'id_report' => $id
        ];
        $sql = $this->db->table('report')->selectWhere($data);
        $idadmin 	= Session::get('superadmin');
        $dataActivity = [
            "id_admin"	 => $idadmin,
            "name_table" => "Report",
            "id"		 => $id,
            "activity" 	 => "Deleted",
            "keterangan" => "MENGHAPUS REPORT BULAN ".date('m',$sql['date']),
            "date"		 => date("Y-m-d H:i:s")
        ];

        $activity = $this->db->table('history_access_logs')->insert($dataActivity);
        if ($activity == false) {
            Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
            return false;
        }

        unlink( paths('path_portal_Report').$sql['report'] );
        return $this->db->table('report')->delete($data);
        }
        // public function edit($id)
        // {
        //     $harga = $this->ctr->post('price');
        //     $total = $this->ctr->post('total_saham');

        //     $data = [
        //         'harga_persaham'=> $harga,
        //         'total_saham'   => $total
        //     ];
        //     $where = [
        //         "id_saham"  => $id
        //     ];
        //     $id_admin 	= Session::get('superadmin');
        //     $dataActivity = [
        //         "id_admin"	 => $id_admin,
        //         "name_table" => "Saham",
        //         "id"		 => $id,
        //         "activity" 	 => "UPDATED",
        //         "keterangan" => "MENGUBAH DATA SAHAM",
        //         "date"		 => date("d-m-Y H:i:s")
        //     ];
        //     return $this->db->table('saham')->update($data,$where);
        // }
        public function download($id)
        {
            $filename    = $id;
            $sql = $this->db->table('report')->where('id_report', $id);
            if ($sql == false) {
                Flasher::setFlashSweet('Failed','Oops! File - not found !!!!','error'); 
                return false;
            }
            $back_dir    = paths('path_portal_Report'); 
            $file = $back_dir.$sql['report'];
            if( Session::check('users') == true ){ 
            $idP = Session::get('users');
            $sql_investor = $this->db->table('investor')->where('id_investor', $idP);
            $idadmin = Session::get('superadmin');
            $dataActivity = [
                "id_admin"	 => $idadmin,
                "name_table" => "Download",
                "id"		 => $idP,
                "activity" 	 => "DOWNLOAD",
                "keterangan" => "INVESTOR ".$sql['investor']['username']." DOWNLOAD REPORT BULAN ".date('m', $sql['date']),
                "date"		 => date("Y-m-d H:i:s")
            ];
            var_dump($dataActivity);
    
            $activity = $this->db->table('history_access_logs')->insert($dataActivity);
            }else{
            $idP = Session::get('superadmin');
            }
            $dataLog = [
				'id' => $idP,
				'time' => date('Y-m-d H:i:s'),
				'device' => Detect::deviceType(),
				'ip' => Detect::ip(),
				'os' => Detect::os(),
				'browser' => Detect::browser(),
				'brand' => Detect::brand()
            ];
            $this->db->table('access_logs_download')->insert($dataLog); 
            if (file_exists($file)) {
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename='.basename($file));
                header('Content-Transfer-Encoding: binary');
                header('Expires: 0');
                header('Cache-Control: private');
                header('Pragma: private');
                header('Content-Length: ' . filesize($file));
                ob_clean();
                flush();
                readfile($file);
                
                
                exit;
            } 
        }
    }
