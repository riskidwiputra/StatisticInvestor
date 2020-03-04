<?php 

	class InvestorController extends Controller
	{ 
        public function Investor(){
            if(Session::check('superadmin') == true ){ 
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
            if(Session::check('superadmin') == true ){ 
                $this->view('template/header');
                $this->view('pages/investor/add_investor');
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function SelectUpdate($id)
        {
            if(Session::check('superadmin') == true ){ 
                $data['content'] = $this->model('Investor_Model')->selectUpdate($id);
                $this->view('template/header');
                $this->view('pages/investor/update_investor',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function ChangePassword($id)
        {
            $data['id'] = $id;
            if(Session::check('superadmin') == true ){ 
                $this->view('template/header');
                $this->view('pages/investor/change_password',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
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
        public function Delete($id)
		{
			if ($this->model('Investor_Model')->delete($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data successfully deleted','success'); 
				redirect('/investor');
					exit;
			}else{
				Flasher::setFlashSweet('Failed','Data failed to delete','warning'); 
				redirect('/investor');
				exit;
            }
        }

        public function Update($id)
        {
            if ($this->model('Investor_Model')->update($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
				redirect('/investor');
				exit;
			}else{
				// Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
				redirect('/investor');
				exit;
			}
        }
        public function Change_Password($id)
        {
            
            if ($this->model('Investor_Model')->change_password($id) > 0 ) {
                Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
                redirect('/nvestor');
                exit;
            }else{
                // Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
                redirect('/change-investor/'.$id);
                exit;
            }
        }
        
    }
