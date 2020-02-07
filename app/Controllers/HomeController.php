<?php 

	class HomeController extends Controller
	{ 
		
		public function Index()
		{
				$data['judul'] = 'Portal - dashboard'; 
				$data['saham'] = $this->db->table('saham')->selectSingle();
				// $data['users'] = $this->db->table('users')->selectAll();
				$this->view('template/header', $data);
				$this->view('pages/dashboard', $data);
				$this->view('template/footer');			
				// <?php foreach ($data['users'] as $rows) {
				// 	echo '{name:"'.$rows['nama'].'",y: '.$rows['persen'].',drilldown:"Chrome"},';
				//   
		} 
		
	}