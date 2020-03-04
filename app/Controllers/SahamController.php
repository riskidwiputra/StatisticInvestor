<?php 

	class SahamController extends Controller
	{ 
        public function Saham(){
            if(Session::check('superadmin') == true ){ 
                $data['content'] = $this->model('Saham_Model')->select();
                $data['saham'] = $this->db->table("saham")->all();
                $data['saham'] = $this->db->rowCount();
                $this->view('template/header');
                $this->view('pages/saham/saham', $data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function Add_Saham(){
            if(Session::check('superadmin') == true ){ 
                $this->view('template/header');
                $this->view('pages/saham/add_saham');
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function Edit_Saham($id){
            $data['content'] = $this->db->table('saham')->where('id_saham', $id); 
            if(Session::check('superadmin') == true ){ 
                $this->view('template/header');
                $this->view('pages/saham/edit_saham',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        
        public function Insert(){
            if ( $this->model('Saham_Model')->insert($_POST) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/saham');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/saham');
                exit;
            }   
        }
        public function Edit($id)
		{
			if ($this->model('Saham_Model')->Edit($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
                redirect('/saham');
                exit;
			}else{
				Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
                redirect('/saham');
                exit;
			}

		}
    }
