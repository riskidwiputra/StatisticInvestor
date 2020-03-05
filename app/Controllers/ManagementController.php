<?php 

	class ManagementController extends Controller
	{
        public function Management()
        {
            var_dump("as");
            // if(Session::check('superadmin') == true ){ 
			// 	$data['content'] = $this->model('Datamanagement_Model')->select();
			// 	$this->view('template/header', $data);
			// 	$this->view('pages/data_management/data_management',$data);
			// 	$this->view('template/footer');		
			// }else{
            //     $this->view('login/login');
            // }

        }
    
    }