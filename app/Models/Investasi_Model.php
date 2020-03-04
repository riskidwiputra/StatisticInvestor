
<?php 

class Investasi_Model extends Model
{ 
    public function select_investor()
	{
			$select = $this->db->table('investor')->all();
			$select = $this->db->resultSet();
			return $select;
	}
	
	public function insert()
	{
		$hash 			= rand(999,999999);
		$username       = $this->ctr->post('username');
		$lembar_saham	= $this->ctr->post('lembar_saham');
		$total_harga    = $this->ctr->post('total_harga');
		$total_harga2 	= str_replace('.', '', trim($total_harga));
		$lot 			= $lembar_saham / 100; 
	
		$data = [
			'id_investasi' => $hash,
			'id_investor'  => $username,
			'total_saham'  => $lembar_saham,
			'total_harga'  => $total_harga2,
			'lot'		   => $lot
		];
		$this->db->table('investasi')->insert($data);
		$id 	= Session::get('superadmin');
		$dataActivity = [
			"id_admin"	 => $id,
			"name_table" => "investasi",
			"id"		 => $hash,
			"activity" 	 => "INSERTED",
			"keterangan" => "INVESTOR ".strtoupper($username). " MEMBELI ".number_format($lembar_saham,0,',','.')." LEMBAR SAHAM ",
			"date"		 => date("Y-m-d H:i:s")
		];
		$activity = $this->db->table('history_access_logs')->insert($dataActivity);
		if ($activity == false) {
			Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
			return false;
			
		}
		return $this->db->rowCount();
	}
	public function insert_transfer()
	{
		$hash 				= rand(999,999999);
		$username_pengirim  = $this->ctr->post('username_pengirim');
		$username_penerima	= $this->ctr->post('username_penerima');
		$lembar_saham   	= $this->ctr->post('lembar_saham');
		$total_harga    	= $this->ctr->post('total_harga');
		$total_harga2 		= str_replace('.', '', trim($total_harga));
		$lot 				= $lembar_saham / 100; 

		$data = [
			'id_investasi' => $hash,
			'id_investor'  => $username_penerima,
			'total_saham'  => $lembar_saham,
			'total_harga'  => $total_harga2,
			'lot'		   => $lot
		];
		
		$insert = $this->db->table('investasi')->insert($data);
		if ($insert > 0) {
			$investasi 				= $this->db->table('investasi')->where("id_investor", $username_pengirim);
			$saham 					= $this->db->table('saham')->selectSingle();
			$lembar 				= $investasi['total_saham'] - $lembar_saham ;
			$total_harga_transfer 	= $lembar * $saham['harga_persaham'];
			$lot 					= $lembar / 100 ;

			
			$data = [
				'total_saham'  	=> $lembar,
				'total_harga'	=> $total_harga_transfer,
				'lot'		    => $lot
			];
			$where = [
				'id_investor'	=> $username_pengirim
			];
			$investasi2 = $this->db->table('investasi')->update($data, $where);
			if ($insert == false) {
			Flasher::setFlashSweet('Failed','Data Investasi Gagal Di Update','error'); 
			return false;
			}
		}else{
			Flasher::setFlashSweet('Failed','Data Investasi Gagal Di Input','error'); 
			return false;
		}
		$data2 = [
			'id_history_transfer'	=> rand(999,999999),
			'id_pengirim'			=> $username_pengirim,
			'id_penerima'			=> $username_penerima,
			'activity'				=> "Mentransfer Saham",
			'jumlah_saham'			=> $lembar_saham,
			'date'					=> date("Y-m-d H:i:s")
		];
		$transfer_h = $this->db->table('history_transfer')->insert($data2);
		if ($transfer_h == false) {
			Flasher::setFlashSweet('Failed','Data history_transfer Gagal Di Input','error'); 
			return false;
		}
		$id 	= Session::get('superadmin');
		$dataActivity = [
			"id_admin"	 => $id,
			"name_table" => "investasi",
			"id"		 => $hash,
			"activity" 	 => "Updated",
			"keterangan" => "MENTRANSFER SAHAM DARI ".strtoupper($username_pengirim)." DAN  MENAMBAH DATA BARU INVESTASI",
			"date"		 => date("Y-m-d H:i:s")
		];
	
		$activity = $this->db->table('history_access_logs')->insert($dataActivity);
		if ($activity == false) {
			Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
			return false;
		}
		return true;
	}
	public function update_transfer()
	{
		$hash 				= rand(999,999999);
		$username_pengirim  = $this->ctr->post('username_pengirim');
		$username_penerima	= $this->ctr->post('username_penerima');
		$lembar_saham   	= $this->ctr->post('lembar_saham');
		$total_harga    	= $this->ctr->post('total_harga');
		$total_harga2 		= str_replace('.', '', trim($total_harga));
		$lot 				= $lembar_saham / 100; 
		
		$investasi_penerima = $this->db->table('investasi')->where("id_investor", $username_penerima);
		$lembar_saham2 		= $lembar_saham + $investasi_penerima['total_saham'];
		$lot2				= $lembar_saham2 / 100;
		$total_harga3		= $total_harga2 + $investasi_penerima['total_harga'];
		
		$data = [
			'total_saham'  => $lembar_saham2,
			'total_harga'  => $total_harga3,
			'lot'		   => $lot2
		];
		$where = [
			'id_investor'	=> $username_penerima
		];
		
		$update = $this->db->table('investasi')->update($data, $where);
		if ($update > 0) {
			$investasi 				= $this->db->table('investasi')->where("id_investor", $username_pengirim);
			$saham 					= $this->db->table('saham')->selectSingle();
		
			$lembar 				= $investasi['total_saham'] - $lembar_saham ;
			$total_harga_transfer 	= $lembar * $saham['harga_persaham'];
			$lot 					= $lembar / 100 ;

			$data = [
				'total_saham'  	=> $lembar,
				'total_harga'	=> $total_harga_transfer,
				'lot'		    => $lot
			];
			
			$where = [
				'id_investor'	=> $username_pengirim
			];
			$update2 = $this->db->table('investasi')->update($data, $where);
			if ($update2 == false) {
				Flasher::setFlashSweet('Failed','Data Investasi Gagal Di Update','error'); 
				return false;
			}
		}else{
			Flasher::setFlashSweet('Failed','Data Investasi Gagal Di Update','error'); 
			return false;
		}
		
		$data = [
			'id_pengirim'	=> $username_pengirim,
			'id_penerima'	=> $username_penerima,
			'activity'		=> "Mentransfer Saham",
			'jumlah_saham'	=> $lembar_saham,
			'date'			=> date("Y-m-d H:i:s")
		];
		$transfer_h = $this->db->table('history_transfer')->insert($data);
		if ($transfer_h == false) {
			Flasher::setFlashSweet('Failed','Data history_transfer Gagal Di Input','error'); 
			return false;
		}
		$id 	= Session::get('superadmin');
		$dataActivity = [
			"id_admin"	 => $id,
			"name_table" => "investasi",
			"id"		 => $hash,
			"activity" 	 => "Updated",
			"keterangan" => "MENTRANFER SAHAM DARI INVESTOR ".strtoupper($username_pengirim)." KE INVESTOR ".strtoupper($username_penerima),
			"date"		 => date("Y-m-d H:i:s")
		];
		$activity = $this->db->table('history_access_logs')->insert($dataActivity);
		if ($activity == false) {
			Flasher::setFlashSweet('Failed','Data activity_logs Gagal Di Input','error'); 
			return false;
			
		}
		return true;

	}
}