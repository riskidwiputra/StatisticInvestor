<?php 

	class NewsController extends Controller
	{ 
		
		public function Index()
		{
			if(Session::check('superadmin') || Session::check('admin') == true ){ 
				// $data['judul'] = 'Kategori'; 
				$data['daily'] 				= $this->model('News_Model')->selectdaily();
				$data['monthly']  			= $this->db->query("SELECT * FROM news WHERE category = 'monthly' ORDER BY date DESC"); 
				$data['monthly']  			= $this->db->resultSet();
				$jumlahDataDaily 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'daily'");
				$jumlahDataDaily 			= $this->db->single();
				$limitDaily					= 4;
				$data['jumlahHalamanDaily'] = ceil($jumlahDataDaily['jumlah'] / $limitDaily);
				$jumlahDataMonthly 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'monthly'");
				$jumlahDataMonthly			= $this->db->single();
				$limitMonthly				= 4;
				$data['jumlahHalamanMonthly'] = ceil($jumlahDataMonthly['jumlah'] / $limitMonthly);
				$this->view('template/header');
                $this->view('pages/news/news',$data);
				$this->view('template/footer');	
			}else{
				redirect('/login');
				exit;
			}	
					
		}
		
		public function Add_Daily()
		{
			if(Session::check('superadmin') || Session::check('admin') == true ){ 
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/addnewsdaily');
				$this->view('template/footer');		
			}else{
				redirect('/login');
				exit;
			}		
		}
		
		public function Add_Monthly()
		{
			if(Session::check('superadmin') || Session::check('admin') == true ){ 
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/addnewsmonthly');
				$this->view('template/footer');		
			}else{
				redirect('/login');
				exit;
			}		
		}
		public function SelectUpdate($id)
        {	
			$data = $this->db->table("news")->where("url",$id);
			if ($data['url'] == $id){
				if(Session::check('superadmin') || Session::check('admin') == true ){ 
					$data['content'] = $this->model('News_Model')->selectUpdate($id);
					$this->view('template/header');
					$this->view('pages/news/update_news',$data);
					$this->view('template/footer');	
				}else{
					redirect('/login');
					exit;
				}
			}else{
				redirect('/error');
				exit;
			}
        }
		public function Single_News($id)
        {
			$data = $this->db->table("news")->where("url",$id);
			if ($data['url'] == $id){
				if(Session::check('users') || Session::check('admin') == true || Session::check('superadmin') == true ){ 
				$data['content'] = $this->db->table('news')->where('url', $id);
				$this->view('template/header');
				$this->view('pages/news/single_news',$data);
				$this->view('template/footer');	
				}else{
					redirect('/login');
					exit;
				}
			}else{
				redirect('/error');
				exit;
			}
			
		}
		public function Pagination_Daily($id)
		{
			$data['daily'] 			= $this->model('News_Model')->selectpagination($id);
			$data['monthly']		= $this->db->query("SELECT * FROM news WHERE category = 'monthly' ORDER BY date DESC LIMIT 0, 4"); 
			$data['monthly']  		= $this->db->resultSet();
			$jumlahDatadaily 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'daily'");
			$jumlahDatadaily 			= $this->db->single();
			$jumlahDataMonthly 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'monthly'");
			$jumlahDataMonthly			= $this->db->single();
			$limitMonthly				= 4;
			$data['jumlahHalamanMonthly'] = ceil($jumlahDataMonthly['jumlah'] / $limitMonthly);
			// batas news yang ingin di tampilkan 
			$limit					= 4;
			// mengambil angka page 
			$data['page-daily']		= $id; 
			// membuat jumlah link number sebelum dan sesudah page yang aktif
			$jumlah_number 			= 4;
			$data['jumlahHalaman'] 	= ceil($jumlahDatadaily['jumlah'] / $limit);
			$data['start_number']	= ($data['page-daily'] > $jumlah_number)? $data['page-daily'] - $jumlah_number : 1;
			
			$data['end_number']		= ($data['page-daily'] < ($data['jumlahHalaman'] - $jumlah_number))? $data['page-daily'] + $jumlah_number :$data['jumlahHalaman'];
			$this->view('template/header');
            $this->view('pages/news/news',$data);
			$this->view('template/footer');	
		}
		public function Pagination_Monthly($id)
		{
			$data['monthly'] 		= $this->model('News_Model')->selectpagination2($id);
			$data['daily']		    = $this->db->query("SELECT * FROM news WHERE category = 'daily' ORDER BY date DESC LIMIT 0, 4"); 
			$data['daily']  		= $this->db->resultSet();
			$jumlahData 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'monthly'");
			$jumlahData 			= $this->db->single();
			$jumlahDataDaily 			= $this->db->query("SELECT COUNT(*) AS jumlah FROM news WHERE category = 'daily'");
			$jumlahDataDaily 			= $this->db->single();
			$limitDaily					= 4;
			$data['jumlahHalamanDaily'] = ceil($jumlahDataDaily['jumlah'] / $limitDaily);
			// batas news yang ingin di tampilkan 
			$limit					= 4;
			// mengambil angka page 
			$data['page-monthly']	= $id; 
			// membuat jumlah link number sebelum dan sesudah page yang aktif
			$jumlah_number 			= 4;
			$data['jumlahHalaman'] 	= ceil($jumlahData['jumlah'] / $limit);
			$data['start_number']	= ($data['page-monthly'] > $jumlah_number)? $data['page-monthly'] - $jumlah_number : 1;
			
			$data['end_number']		= ($data['page-monthly'] < ($data['jumlahHalaman'] - $jumlah_number))? $data['page-monthly'] + $jumlah_number :$data['jumlahHalaman'];
			$this->view('template/header');
            $this->view('pages/news/news',$data);
			$this->view('template/footer');	
		}
		public function Insert()
		{
			if ( $this->model('News_Model')->insert($_POST) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/news');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/news');
                exit;
            }   
		}
		
		public function Delete($id)
		{
			if ($this->model('News_Model')->delete($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data successfully deleted','success'); 
				redirect('/news');
					exit;
			}else{
				Flasher::setFlashSweet('Failed','Data failed to delete','warning'); 
				redirect('/news');
				exit;
            }
		}
		public function Upload($id)
		{
			// if (Session::check('portal') == true ) {
			// 	Session::unset('portal');
			// }
			// $dataportal = $_GET['data2'];
			// Session::set('portal', $dataportal);  
			echo $id;
		}
		public function Update($id)
        {
            if ($this->model('News_Model')->update($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
				redirect('/news');
				exit;
			}else{
				// Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
				redirect('/news');
				exit;
			}
        }
    }