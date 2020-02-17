<?php 

	class HomeController extends Controller
	{ 
		
		public function Index()
		{
			if(Session::check('users') || Session::check('admin') == true ){ 
				$data['judul']	 	= 'Portal - dashboard'; 
				$data['saham'] 		= $this->db->table('saham')->selectSingle(); 
				$data['investor']	= $this->db->table('investor')->where('id_investor', Session::get('users'));
				$saldo				= $this->db->table('investasi')->whereAll('id_investor', $data['investor']['username']);
				foreach ($saldo as $row) {
                    $array[] = $row['total_saham']; 
                }   
                for($i=0; $i < count($array); $i++){
                    $jumlah=$array[$i]+$jumlah;
				}
				$data['saldo'] = $jumlah * $data['saham']['harga_persaham'];
				$data['admin']	=$this->db->table('admin')->where('id_admin', Session::get('admin'));	
				$data['investasi'] = $this->db->table('investasi')->selectAll();
				$this->view('template/header', $data);
				$this->view('pages/dashboard', $data);
				$this->view('template/footer');			
			
				// 	echo '{name:"'.$rows['nama'].'",y: '.$rows['persen'].',drilldown:"Chrome"},';
				//   
			}else{
				redirect('/login');
				exit;
			}   
		} 
		
	}