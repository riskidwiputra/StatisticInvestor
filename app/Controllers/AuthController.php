<?php 

	class AuthController extends Controller
	{ 
		
		public function IndexLogin()
		{	
			if(Session::check('users') || Session::check('admin') == true ){ 
				redirect('/');
			}else{
				$this->view('login/login');
			}
        } 
        
        public function Login()
		{   
			if ($this->model('Login_Model')->login($_POST) > 0) { 
			redirect('/');	
			exit;
			}else{ 
			redirect('/login');
			exit;
			}    
		} 

		public function Logout()
		{
			Session::unset();
			redirect('/');
		}

		public function activity_log()
		{
			if( Session::check('admin') == true ){ 
				$id_admin = Session::get('admin');

				$data['content'] = $this->db->query("SELECT * FROM history_access_logs WHERE id_admin = '$id_admin' ORDER BY date ASC");
				$data['content'] = $this->db->resultset();
				$this->view('template/header');
                $this->view('pages/activity_log/activity_log',$data);
                $this->view('template/footer');	
			}else{
				$this->view('login/login');
			}
		}
		public function history_transfer()
		{
			if( Session::check('users') == true ){ 
				$id_users = Session::get('users');
				$data['pengirim'] = $this->db->table('investor')->where('id_investor', $id_users);
				$data['content'] = $this->db->table('history_transfer')->whereAll('id_pengirim', $data['pengirim']['username']);
				
				$this->view('template/header');
                $this->view('users/history_transfer/history_transfer',$data);
				$this->view('template/footer');	
			}else if( Session::check('admin') == true ){ 
				// $id_admin = Session::get('admin');
				// $data['pengirim'] = $this->db->table('investor')->where('id_investor', $id_users);
				$data['content'] = $this->db->table('history_transfer')->selectAll();
				$this->view('template/header');
                $this->view('users/history_transfer/history_transfer',$data);
				$this->view('template/footer');
			}else{
				$this->view('login/login');
			}
		}
		public function Error()
		{
			$this->view('error/404');
		}
		
	}