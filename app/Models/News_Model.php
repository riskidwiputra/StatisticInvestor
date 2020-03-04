<?php 

	class News_Model extends Model
	{ 
        public function selectdaily()
        {
            $select = $this->db->query("SELECT * FROM news WHERE category = 'daily' ORDER BY date DESC LIMIT 0, 4"); 
            $select = $this->db->resultSet();

			return $this->db->resultSet();
        }
        public function selectUpdate($id)
        {
            $data =[
                'url' => $id
            ];
            $select = $this->db->table('news')->selectWhere($data); 
			return $select;
        }
        public function selectpagination($id)
		{	
			$limit			= 4;
			$limit_start 	= ($id - 1) * $limit;
			 $this->db->query("SELECT * FROM news WHERE category = 'daily' ORDER BY id_news DESC LIMIT ".$limit_start.",".$limit);
			return $this->db->resultSet();
		}
        public function selectpagination2($id)
		{	
			$limit			= 4;
			$limit_start 	= ($id - 1) * $limit;
			$this->db->query("SELECT * FROM news WHERE category = 'monthly' ORDER BY id_news DESC LIMIT ".$limit_start.",".$limit);
			return $this->db->resultSet();
		}
        public function insert()
		{ 
    
            $filter         = ['~', '`','-', '!', '@', '#', '$', '%', '^', '&','*','*','(',')','-','_','=','+','.',',','/','?','”','[','{','}',']','‘',';','<','>','|',':'];
            $simbols        = [''];
            $hash           = rand();
            $title          = $this->ctr->post('title'); 
            $content        = $this->ctr->post('content'); 
            $category       = $this->ctr->post('category'); 
            $url            = strtolower(str_replace(" ","-",trim(str_replace($filter, $simbols,$title)))).'-'.rand();
            $date           = date('Y-h-d H:i');
            $gambar         = $_FILES['foto']['name'];
            $source         = $_FILES['foto']['tmp_name'];
            

            $folder         = paths('path_portal_News'); 

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
        
            $data =
            [   
            'id_news'   => $hash,
            'title'     => $title,
            'content'   => $content,
            'image'     => $namaFileBaru,
            'category'  => $category,
            'url'       => $url,
            'date'      => $date
            ];		
            $dataId = [
                'id_news' => $id
            ];
            $sql = $this->db->table('news')->selectWhere($dataId);
            if(Session::check('superadmin') == true) {
                $idadmin 	= Session::get('superadmin');
            }else{
                $idadmin 	= Session::get('admin');
            }
        
            $dataActivity = [
                "id_admin"	 => $idadmin,
                "name_table" => "News",
                "id"		 => $hash,
                "activity" 	 => "INSERTED",
                "keterangan" => "MENAMBAH ". strtoupper($sql['category'])." NEWS ",
                "date"		 => date("Y-m-d H:i:s")
            ];
    
            $activity = $this->db->table('history_access_logs')->insert($dataActivity);
            if ($activity == false) {
                Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                return false;
            }
    
        return $this->db->table('news')->insert($data);	
            
        
        }
        public function delete($id)
        {
        $data = [
            'id_news' => $id
        ];
        $sql = $this->db->table('news')->selectWhere($data);
        if(Session::check('superadmin') == true ) {
            $idadmin 	= Session::get('superadmin');
        }else{
            $idadmin 	= Session::get('admin');
        }
        $dataActivity = [
            "id_admin"	 => $idadmin,
            "name_table" => "News",
            "id"		 => $id,
            "activity" 	 => "Deleted",
            "keterangan" => "MENGHAPUS ". strtoupper($sql['category'])." NEWS ",
            "date"		 => date("Y-m-d H:i:s")
        ];

        $activity = $this->db->table('history_access_logs')->insert($dataActivity);
        if ($activity == false) {
            Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
            return false;
        }

        unlink( paths('path_portal_News').$sql['image'] );
        return $this->db->table('news')->delete($data);
        }
        public function update($id)
		{
			$title      	= $this->ctr->post('title');
			$content 		= $this->ctr->post('content');

            if (!empty($_FILES['foto']['name'])) {
			
                $gambar  = $_FILES['foto']['name'];
                $source  = $_FILES['foto']['tmp_name'];

                $folder  = paths('path_portal_News'); 

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
						'id_news'	=> $id
					];
                    $sql = $this->db->table('news')->selectWhere($where);
					if (!empty($sql['image'])) 
					{
					unlink( paths('path_portal_News').$sql['image'] );
					}
					
                }
                $data = [
                    'title' 			=> $title,
                    'content' 		    => $content,
                    'image'             => $namaFileBaru
                    ];
    
			}else{
                $data = [
                    'title' 			=> $title,
                    'content' 		    => $content
                    ];
            } 
    
                $where = [
                'id_news' => $id
                ];	
                $sql = $this->db->table('news')->selectWhere($where);
        
                if(Session::check('superadmin') == true) {
                    $idadmin 	= Session::get('superadmin');
                }else{
                    $idadmin 	= Session::get('admin');
                }
                    $dataActivity = [
                        "id_admin"	 => $id_admin,
                        "name_table" => "news",
                        "id"		 => $id,
                        "activity" 	 => "UPDATED",
                        "keterangan" => "MENGUBAH ". strtoupper($sql['category'])." NEWS ",
                        "date"		 => date("Y-m-d H:i:s")
                    ];
                
                $activity = $this->db->table('history_access_logs')->insert($dataActivity);
                if ($activity == false) {
                    Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
                    return false;
                }
			return $this->db->table('news')->update($data ,$where);
		
        }
        
    }