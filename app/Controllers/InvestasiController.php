<?php 

	class InvestasiController extends Controller
	{ 
        public function Investasi(){
            if(Session::check('admin') == true ){ 
                $data['investor'] = $this->model('Investasi_Model')->select_investor();
                $data['saham'] = $this->db->table('saham')->selectSingle(); 
                $data['investasi']= $this->db->query("SELECT * FROM investasi");
                $data['investasi']= $this->db->resultSet();
                
                foreach ($data['investasi'] as $row) {
                    $array[] = $row['total_saham']; 
                }   
                for($i=0; $i < count($array); $i++){
                    $jumlah=$array[$i]+$jumlah;
                }
                $data['sisa_saham'] = $data['saham']['total_saham'] - $jumlah;
                $this->view('template/header');
                $this->view('pages/investasi/investasi',$data);
                $this->view('template/footer');	
        }else{
            redirect('/login');
			exit;
        }
        }
        public function Get_Saham(){
            $saham = $this->db->table('saham')->selectSingle(); 
			echo $saham['harga_persaham'];
        }
        public function Get_Harga($id){
            $data = number_format($id,0,',','.');
            if ($id == 0) {
                echo json_encode(0);
            }else{
                echo json_encode($data);
            }
        
            
        }
        // public function Add_Investor(){
        //     if(Session::check('admin') == true ){ 
        //         $this->view('template/header');
        //         $this->view('pages/investasi/add_investor');
        //         $this->view('template/footer');	
        // }else{
        //     // redirect('/login');
		// 	exit;
        // }
        // }
        
        public function Insert(){
            $saham = $this->db->table('saham')->selectSingle();
            $investasi = $this->db->table('investasi')->selectAll();
            foreach ($investasi as $row) {
                $array[] = $row['total_saham']; 
            }
            for($i=0; $i < count($array); $i++){
                $jumlah=$array[$i]+$jumlah;
            }
            $lembar_saham = $_POST['lembar_saham'];
            $total = $lembar_saham + $jumlah;
            if ($total <= $saham['total_saham']) {
                if ( $this->model('Investasi_Model')->insert($_POST) > 0) {
                    Flasher::setFlashSweet('successfully','Data successfully added','success');
                    redirect('/investasi');
                    exit;
                } else { 
                    // Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                    redirect('/investasi');
                    exit;
                }   
            }else {
                Flasher::setFlashSweet('Failed','SaHam Sudah Habis','warning'); 
                redirect('/investasi');
                exit;
            }
    
        }
    }
