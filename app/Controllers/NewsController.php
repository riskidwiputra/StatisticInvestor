<?php 

	class NewsController extends Controller
	{ 
		
		public function Index()
		{
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/news');
                $this->view('template/footer');			
		}
		
		public function Add_Daily()
		{
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/addnewsdaily');
                $this->view('template/footer');			
		}
		
		public function Add_Monthly()
		{
				// $data['judul'] = 'Kategori'; 
				// $data['content'] = $this->model('Kategori_Model')->select();
				$this->view('template/header');
                $this->view('pages/news/addnewsmonthly');
                $this->view('template/footer');			
        }
    }