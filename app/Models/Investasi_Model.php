
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
		var_dump($total_harga2);
		
		$data = [
			'id_investasi' => $hash,
			'id_investor'  => $username,
			'total_saham'  => $lembar_saham,
			'total_harga'  => $total_harga2,
			'lot'		   => $lot
		];
		$this->db->table('investasi')->insert($data);
		return $this->db->rowCount();
	}
}