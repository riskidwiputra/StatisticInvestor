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
        public function Get_Transfer($id){
            $data = number_format($id,0,',','.');
            if ($id == 0) {
                echo json_encode(0);
            }else{
                echo json_encode($data);
            }
        }
        public function Get_Lembar(){
            $saham = $this->db->table('investasi')->where('id_investor' , $_POST['data']); 
            if (empty($saham['total_saham'])) {
                echo 0;
            }else{
                echo $saham['total_saham'];
            }
        }
        public function Get_Harga($id){
            $data = number_format($id,0,',','.');
            if ($id == 0) {
                echo json_encode(0);
            }else{
                echo json_encode($data);
            }    
        }
        
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
        
        public function Insert_Transfer(){
            // $saham_pengirim = $this->db->table('investor')->where("username", $_POST['username_pengirim']);
            // $id_pengirim = $saham_pengirim['id_investor'];
            $investasi = $this->db->table('investasi')->where("id_investor", $_POST['username_pengirim']);
            $transfer  = $this->db->table('investasi')->where("id_investor", $_POST['username_penerima']);
            if ($investasi > 0) {
                if ($investasi['total_saham'] != 0) {
                    if ($_POST['lembar_saham'] <= $investasi['total_saham']) {
                        if ($transfer > 0) {
                            if ($this->model('Investasi_Model')->update_transfer($_POST) > 0 ) {
                                Flasher::setFlashSweet('successfully','Data updated successfully','success'); 
                                redirect('/investasi');
                                exit;
                            }else{
                                Flasher::setFlashSweet('Failed','Data Failed To Update','warning'); 
                                redirect('/investasi');
                                exit;
                            }
                        }else{
                            if ($this->model('Investasi_Model')->insert_transfer($_POST) > 0) {
                                Flasher::setFlashSweet('successfully','Data successfully added','success');
                                redirect('/investasi');
                                exit;
                            } else { 
                                Flasher::setFlashSweet('Failed','Data failed to add','warning'); 
                                redirect('/investasi');
                                exit;
                            }  
                        } 
                    }else {
                        Flasher::setFlashSweet('Failed','Saham  <b>'. $_POST["username_pengirim"] .'</b> Hanya Tersisa '.$investasi['total_saham'],'warning'); 
                        redirect('/investasi');
                        exit;
                    }
                }else {
                    Flasher::setFlashSweet('Failed','Saham  <b>'. $_POST["username_pengirim"] .'</b> Sudah Habis','warning'); 
                    redirect('/investasi');
                    exit;
                }
            }else{
                Flasher::setFlashSweet('Failed', 'Saham <b>'. $_POST["username_pengirim"] .'</b> Tidak Ada!!','warning'); 
                redirect('/investasi');
                exit;
            }
        }
    }
