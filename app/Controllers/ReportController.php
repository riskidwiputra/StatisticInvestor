<?php 

	class ReportController extends Controller
	{ 
        public function Report(){
            if(Session::check('admin') == true ){ 
                $data['content'] = $this->model('Report_Model')->select();
                foreach ($data['content'] as $rows) { 
                    $bulan[] = date("Y-m",strtotime($rows['date']));
                }
                $hitung = count($bulan);
                for ($i=0; $i < $hitung ; $i++) { 
                    if ($bulan[$i] == date('Y-m')) {
                        $data['bulan'] = 1;
                    }
                }
                
                // $data['saham'] = $this->db->table("saham")->all();
                // $data['saham'] = $this->db->rowCount();
                $this->view('template/header');
                $this->view('pages/report/report',$data);
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        public function Add_Report(){
            if(Session::check('admin') == true ){ 
                $this->view('template/header');
                $this->view('pages/report/add_report');
                $this->view('template/footer');	
            }else{
                redirect('/login');
                exit;
            }
        }
        
        public function Insert(){
            if ( $this->model('Report_Model')->insert($_POST) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/report');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/report');
                exit;
            }   
        }
        public function Download($id){
            if ( $this->model('Report_Model')->download($id) > 0) {
                Flasher::setFlashSweet('successfully','Data successfully added','success');
                redirect('/report');
                exit;
            } else { 
                // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                redirect('/report');
                exit;
            }   
        }
        public function Delete($id)
		{
			if ($this->model('Report_Model')->delete($id) > 0 ) {
				Flasher::setFlashSweet('successfully','Data successfully deleted','success'); 
				redirect('/report');
					exit;
			}else{
				Flasher::setFlashSweet('Failed','Data failed to delete','warning'); 
				redirect('/report');
				exit;
            }
		}
        // public function Edit($id)
		// {
		// 	if ($this->model('Saham_Model')->Edit($id) > 0 ) {
		// 		Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
        //         redirect('/saham');
        //         exit;
		// 	}else{
		// 		Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
        //         redirect('/saham');
        //         exit;
		// 	}

		// }
    }
