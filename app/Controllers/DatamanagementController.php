<?php 

	class DatamanagementController extends Controller
	{ 

		public function Index()
		{   
            if(Session::check('superadmin') == true ){ 
				$data['content'] = $this->model('Datamanagement_Model')->select();
				$this->view('template/header', $data);
				$this->view('pages/data_management/data_management',$data);
				$this->view('template/footer');		
			}else{
				$this->view('login/login');
			}
        } 
		public function AddDatamanagement()
		{   
            if(Session::check('superadmin') == true ){ 
				$this->view('template/header', $data);
				$this->view('pages/data_management/add_data_management'
			
			
			
			);
				$this->view('template/footer');		
			}else{
				$this->view('login/login');
            }
		} 
		public function Insert(){
			if ( $this->model('Datamanagement_Model')->insert($_POST) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/data-management');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/data-management');
                exit;
            }   
		}
    }