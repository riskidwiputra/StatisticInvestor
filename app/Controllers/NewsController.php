<?php 

	class NewsController extends Controller
	{ 
		
		public function Index()
		{
			if(Session::check('users') || Session::check('admin') == true ){ 
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/news');
				$this->view('template/footer');	
			}else{
				redirect('/login');
				exit;
			}	
					
		}
		
		public function Add_Daily()
		{
			if(Session::check('admin') == true ){ 
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
			if(Session::check('admin') == true ){ 
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
    }