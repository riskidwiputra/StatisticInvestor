<?php 

	class HomeController extends Controller
	{ 
		
		public function Index()
		{
			if(Session::check('users') || Session::check('admin') == true || Session::check('superadmin') == true ){ 
				$data['judul']	 	= 'Portal - dashboard'; 
				$data['saham'] 		= $this->db->table('saham')->selectSingle(); 
				$data['investor']	= $this->db->table('investor')->where('id_investor', Session::get('users'));
				$data['valuatif']	= $this->db->query("SELECT * FROM nilai_valuatif ORDER BY DATE_FORMAT(date, '%Y/%m/%d/%H/%i/%s') DESC ");
				$data['valuatif']	= $this->db->single();
			
				$data['grafik_valuatif']	= $this->db->query("SELECT * FROM nilai_valuatif ORDER BY DATE_FORMAT(date, '%Y/%m/%d/%H/%i/%s') ASC ");
				$data['grafik_valuatif']	= $this->db->resultSet();
				foreach ($data['grafik_valuatif'] as $rows) {
					$tahunA[] 	=  date("Y",strtotime($rows['date'])).', ';
					$bulanA[] 	=  date("m",strtotime($rows['date']))-1;
					$hariA[]	=  ', '.date("d, H, i , s",strtotime($rows['date']));
					$datatgl[] 	= date("Y-m-d",strtotime($rows['date']));
					$dataq[]	= $rows['nilai_valuatif'];
				}		
				
			
				$data['Jmlh'] = count($data['grafik_valuatif']);
				for ($i=0; $i < $data['Jmlh'] ; $i++) { 
					$end2[] = $tahunA[$i].$bulanA[$i].$hariA[$i]; 
				}
			
				$data['nilai_valuatif'] = $dataq;
				$data['tglUsers'] = $end2;
				$data['All'] = array_combine($data['tglUsers'],$dataq);
				
				
				
				$saldo				= $this->db->table('investasi')->whereAll('id_investor', $data['investor']['username']);
				
				foreach ($saldo as $row) {
                    $array[] = $row['total_saham']; 
                }   
                for($i=0; $i < count($array); $i++){
                    $jumlah=$array[$i]+$jumlah;
				}
				$data['saldo'] = $jumlah * $data['saham']['harga_persaham'];
				$data['admin']	=$this->db->table('admin')->where('id_admin', Session::get('admin'));	
				$data['report']	= $this->db->table('report')->selectAll();
				
				$hari = date("Y-m");
				$data['report'] = $this->db->query("SELECT * FROM report WHERE date LIKE '$hari%'");
				$data['report'] = $this->db->single();
				$data['investasi'] = $this->db->table('investasi')->selectAll();
				$data['daily'] 				= $this->model('News_Model')->selectdaily();	
				$data['monthly']  			= $this->db->query("SELECT * FROM news WHERE category = 'monthly' ORDER BY date_inserted DESC"); 
				$data['monthly']  			= $this->db->resultSet();
				$jumlahDataDaily 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'daily'");
				$jumlahDataDaily 			= $this->db->single();
				$limitDaily					= 4;
				$data['jumlahHalamanDaily'] = ceil($jumlahDataDaily['jumlah'] / $limitDaily);
				$jumlahDataMonthly 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'monthly'");
				$jumlahDataMonthly			= $this->db->single();
				$limitMonthly				= 4;
				$data['jumlahHalamanMonthly'] = ceil($jumlahDataMonthly['jumlah'] / $limitMonthly);
				$this->view('template/header', $data);
				$this->view('pages/dashboard', $data);
				$this->view('template/footer');			
			
				// // 	echo '{name:"'.$rows['nama'].'",y: '.$rows['persen'].',drilldown:"Chrome"},';
				//  
			}else if ($_COOKIE['auth'] || $_COOKIE['cookieUsername'] == true ){
				$validasi = $this->is_Cookie($_COOKIE['cookieUsername'] , $_COOKIE['auth']);
				if ($validasi == true) {
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
				$data['report']	= $this->db->table('report')->selectAll();
				
				
				$hari = date("Y-m");
				$data['report'] = $this->db->query("SELECT * FROM report WHERE date LIKE '$hari%'");
				$data['report'] = $this->db->single();
				$data['investasi'] = $this->db->table('investasi')->selectAll();
				$data['daily'] 				= $this->model('News_Model')->selectdaily();
				$data['monthly']  			= $this->db->query("SELECT * FROM news WHERE category = 'monthly' ORDER BY date_inserted DESC"); 
				$data['monthly']  			= $this->db->resultSet();
				$jumlahDataDaily 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'daily'");
				$jumlahDataDaily 			= $this->db->single();
				$limitDaily					= 4;
				$data['jumlahHalamanDaily'] = ceil($jumlahDataDaily['jumlah'] / $limitDaily);
				$jumlahDataMonthly 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'monthly'");
				$jumlahDataMonthly			= $this->db->single();
				$limitMonthly				= 4;
				$data['jumlahHalamanMonthly'] = ceil($jumlahDataMonthly['jumlah'] / $limitMonthly);
				$this->view('template/header', $data);
				$this->view('pages/dashboard', $data);
				$this->view('template/footer');		
				}else{
					redirect('/login');
				} 
			}else{
				redirect('/login');
				exit;
			}   
		} 
		
	}