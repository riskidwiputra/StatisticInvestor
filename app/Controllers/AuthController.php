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
		
	}