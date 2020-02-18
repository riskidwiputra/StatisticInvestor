<?php 

	class InvestorController extends Controller
	{ 
        public function Investor(){
            if(Session::check('admin') == true ){ 
                $data['content'] = $this->model('Investor_Model')->select();
                $this->view('template/header');
                $this->view('pages/investor/investor',$data);
                $this->view('template/footer');	
        }else{
            redirect('/login');
			exit;
        }
        }
        public function Add_Investor(){
            if(Session::check('admin') == true ){ 
                $this->view('template/header');
                $this->view('pages/investor/add_investor');
                $this->view('template/footer');	
        }else{
            // redirect('/login');
			exit;
        }
        }
        
        public function Insert(){
            if ( $this->model('Investor_Model')->insert($_POST) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/investor');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/investor');
                exit;
            }   
            
        }
    }
