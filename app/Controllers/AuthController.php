<?php 
	class AuthController extends Controller
	{ 
		
		public function IndexLogin()
		{	
			if(Session::check('users') || Session::check('admin')  || Session::check('superadmin') == true ){ 
			redirect('/');
			}else if ($_COOKIE['cookielogin'] || $_COOKIE['cookieUsername'] == true ){
				$validasi = $this->is_Cookie($_COOKIE['cookieUsername'] , $_COOKIE['cookielogin']);
				if ($validasi == true) {
					redirect('/');
				}else{
					$this->view('login/login');
				}
			}else{
				$this->view('login/login');
			}
        } 
        
        public function Login()
		{   
			if(Session::check('users') || Session::check('admin') || Session::check('superadmin') == true ){ 
				redirect('/');
			}else{
				if ($this->model('Login_Model')->login($_POST) > 0) { 
				redirect('/');	
				exit;
				}else{ 
				redirect('/login');
				exit;
				}    
			
			}

		} 

		public function Logout()
		{
			Session::unset();
			if(isset($_COOKIE['cookielogin']))      
			{
				setcookie("cookielogin","", 0);
				setcookie("cookieUsername","",  time() - 3600 * 24 *30);
			}
			redirect('/');
		}

		public function activity_log()
		{
			if( Session::check('superadmin') == true ){ 
				$id_admin = Session::get('superadmin');
				$data['content'] = $this->db->query("SELECT * FROM history_access_logs WHERE id_admin = '$id_admin' ORDER BY date DESC");
				$data['content'] = $this->db->resultset();
				$this->view('template/header');
                $this->view('pages/activity_log/activity_log',$data);
                $this->view('template/footer');	
			}else{
				redirect('/login');
			}
		}
		public function history_transfer()
		{
			if( Session::check('users')){ 
				if (Session::check('users') == true) {
					$id_users = Session::get('users');
					$data['pengirim'] = $this->db->table('investor')->where('id_investor', $id_users);
					$data['content'] = $this->db->table('history_transfer')->whereAll('id_pengirim', $data['pengirim']['username']);
					
					$this->view('template/header');
					$this->view('users/history_transfer/history_transfer',$data);
					$this->view('template/footer');	
				
				
				}
			
			}else if( Session::check('superadmin') == true ){ 
				// $id_admin = Session::get('admin');
				// $data['pengirim'] = $this->db->table('investor')->where('id_investor', $id_users);
				$data['content'] = $this->db->table('history_transfer')->selectAll();
				$this->view('template/header');
                $this->view('users/history_transfer/history_transfer',$data);
				$this->view('template/footer');
			}else if ($_COOKIE['cookielogin'] == true  ){
				$id_users =  decrypt($_COOKIE['cookielogin']);
				$data['pengirim'] = $this->db->table('investor')->where('id_investor', $id_users);
				if ($data['pengirim'] == true) {
					$data['content'] = $this->db->table('history_transfer')->whereAll('id_pengirim', $data['pengirim']['username']);
				
					$this->view('template/header');
					$this->view('users/history_transfer/history_transfer',$data);
					$this->view('template/footer');	
				}else{
					redirect('/login');
				}
			
			}else{
				redirect('/login');
			}
		}
		public function Error()
		{
			$this->view('error/404');
		}
		
	}