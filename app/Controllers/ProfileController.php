<?php 

	class ProfileController extends Controller
	{ 
        public function Profile(){
            if(Session::check('superadmin') || Session::check('admin') == true ){ 
                if (Session::check('superadmin') == true) {
                    $data['content'] = $this->db->table('admin')->where('id_admin', Session::get('superadmin'));
                }else{
                    $data['content'] = $this->db->table('admin')->where('id_admin', Session::get('admin'));
                }
                $this->view('template/header');
                $this->view('pages/profile/profile',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }

        public function Update_Profile()
        {
            if(Session::check('superadmin') || Session::check('admin') == true  ){ 
                if (Session::check('superadmin') == true) {
                    $data['content'] = $this->db->table('admin')->where('id_admin', Session::get('superadmin'));
                }else{
                    $data['content'] = $this->db->table('admin')->where('id_admin', Session::get('admin'));
                }
                $this->view('template/header');
                $this->view('pages/profile/update_profile',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function Change_Password($id)
        {
            $data['id'] = $id;
            if(Session::check('superadmin') || Session::check('admin') == true){ 
                $this->view('template/header');
                $this->view('pages/profile/change_password_profile',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        
        // public function Delete($id)
		// {
		// 	if ($this->model('Investor_Model')->delete($id) > 0 ) {
		// 		Flasher::setFlashSweet('successfully','Data successfully deleted','success'); 
		// 		redirect('/investor');
		// 			exit;
		// 	}else{
		// 		Flasher::setFlashSweet('Failed','Data failed to delete','warning'); 
		// 		redirect('/investor');
		// 		exit;
        //     }
        // }

        public function Update($id)
        {
            if ($this->model('Profile_Model')->update($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
				redirect('/profile');
				exit;
			}else{
				// Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
				redirect('/profile');
				exit;
			}
        }
        public function Change_Password_profile($id)
        {
            
            if ($this->model('Profile_Model')->change_password($id) > 0 ) {
                Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
                redirect('/profile');
                exit;
            }else{
                // Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
                redirect('/profile');
                exit;
            }
        }
        
    }
