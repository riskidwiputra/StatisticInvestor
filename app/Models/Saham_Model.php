<?php 

	class Saham_Model extends Model
	{ 
        public function select()
        {
            $select = $this->db->table('saham')->selectAll(); 
			return $select;
        }
        
        public function insert()
		{ 
            $hash		= rand(999,999999);
            $name       = $this->ctr->post('name');
            $price      = $this->ctr->post('price');
            $total      = $this->ctr->post('total_saham');
            $year       = $this->ctr->post('tahun'); 

            $data = [
                'id_saham'      => $hash,
                'name_saham'    => $name,
                'harga_persaham'=> $price,
                'total_saham'   => $total,
                'tahun'         => $year
            ];
            $this->db->table('saham')->insert($data);
            $id_admin 	= Session::get('superadmin');
            $dataActivity = [
                "id_admin"	 => $id_admin,
                "name_table" => "Saham",
                "id"		 => $hash,
                "activity" 	 => "INSERTED",
                "keterangan" => "MEMBUAT DATA SAHAM",
                "date"		 => date("Y-m-d H:i:s")
            ];
        
            $activity = $this->db->table('history_access_logs')->insert($dataActivity);
            return $this->db->rowCount();
        }
        public function edit($id)
        {
            $harga = $this->ctr->post('price');
            $total = $this->ctr->post('total_saham');

            $data = [
                'harga_persaham'=> $harga,
                'total_saham'   => $total
            ];
            $where = [
                "id_saham"  => $id
            ];
            $id_admin 	= Session::get('superadmin');
            $dataActivity = [
                "id_admin"	 => $id_admin,
                "name_table" => "Saham",
                "id"		 => $id,
                "activity" 	 => "UPDATED",
                "keterangan" => "MENGUBAH DATA SAHAM",
                "date"		 => date("Y-m-d H:i:s")
            ];
            return $this->db->table('saham')->update($data,$where);
        }
    }
