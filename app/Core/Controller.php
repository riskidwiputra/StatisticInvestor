<?php 

    class Controller {  

        public function __construct()
        {
            $this->db = new Database; 
        }
        
        public function view($view, $data = [])
        {
            require_once 'app/Views/' . $view . '.php';
        }

        public function model($model){
                require 'app/Models/'.$model.'.php';
                return new $model;
        }

        public function set_session($name, $data)
        {  
            session_start();
            $_SESSION[$name] = $data;
            return true;
        }   

        public function is_session($name)
        {
            if (isset($_SESSION[$name])) {
                return true;
            } else {
                return false;
            }
        }

        public function is_login()
        {
            if ($this->is_session('users')) {
                return true;
            } else {
                return false;
            }
        }

        public function post($name, $type = null) 
        {
            switch ($type) {
                case FALSE:
                    return htmlspecialchars(addslashes( $_POST[$name] ));
                    break;
                
                case TRUE:
                    return htmlspecialchars(htmlentities(trim($_POST[$name]), ENT_QUOTES, 'UTF-8')); 
                    break;

                default: 
                    return htmlspecialchars(htmlentities(trim($_POST[$name]), ENT_QUOTES, 'UTF-8')); 
                    break;
            } 
        }
        public function buatKode($tabel, $inisial, $field){
            $qry    = mysqli_query($this->db->connection(),"SELECT MAX(".$field.") FROM ".$tabel);
            $row    = mysqli_fetch_array($qry); 
        
    
                if ($row['0']=="") {
                    $inisials         = $inisial."0001";
                    return $hasilkode = $inisials;
                }else{
                    $nilaikode    = substr($row[0], strlen($inisial));
                
                    $kode         = (int) $nilaikode;
            
                    $kode         = $kode + 1;
            
                    return $hasilkode = $inisial . str_pad($kode, 4, "0", STR_PAD_LEFT);
            
                }
            
        }

        public function sendMail($type, $data)
        { 
            $email_pengirim = 'rizkydwiputra1250@gmail.com'; // Isikan dengan email pengirim
            $nama_pengirim = 'riski'; // Isikan dengan nama pengirim
            $email_penerima = $data['email']; // Ambil email penerima dari inputan form
                        

            $this->mail = new PHPMailer;
            $this->mail->isSMTP();
            $this->mail->Host = 'smtp.gmail.com';
            $this->mail->Username = $email_pengirim; // Email Pengirim
            $this->mail->Password = 'djjwmgbxrbptugua'; // Isikan dengan Password email pengirim
            $this->mail->Port = 587;
            $this->mail->SMTPAuth = true;
            $this->mail->SMTPSecure = 'ssl';
            // $this->mail->SMTPDebug = 2; // Aktifkan untuk melakukan debugging 
            $this->mail->SetFrom('admin@makaronikia.com','Luna.com');
            $this->mail->addReplyTo('replyto@example.com','luna.com');
            $this->mail->addAddress($email_penerima, '');
            $this->mail->isHTML(true); // Aktifkan jika isi emailnya berupa html

            // Load file content.php
            ob_start();
            if ($type == 'verify') {
                $subjek = "Please Verify Your Email"; 
                $this->view('email/verify' , $data);
            } elseif ($type == 'forget') {
                $subjek = "Reset Password"; 
                $this->view('email/reset' , $data);
            } elseif ($type == 'suspicious') {
                $subjek = "Suspicious Activity"; 
                $this->view('email/suspicious' , $data);
            }
            $content = ob_get_contents();  
            ob_end_clean(); 
            $this->mail->Subject = $subjek;
            $this->mail->Body = $content; 
            $this->mail->AddEmbeddedImage( asset('images/logoluna.png'), 'logoluna', 'logoluna.png');  
            $this->mail->AddEmbeddedImage( asset('images/bgluna.png'), 'bgluna', 'bgluna.png');
            $this->mail->AddEmbeddedImage( asset('images/fb.png'), 'fb', 'fb.png');
            $this->mail->AddEmbeddedImage( asset('images/twitter.png'), 'twitter', 'twitter.png');
            $this->mail->AddEmbeddedImage( asset('images/instagram.png'), 'instagram', 'instagram.png');
            // if(empty($attachment)){ // Jika tanpa attachment
            // $this->mail->SMTPDebug = 2;
            $this->mail->send();
                
            return $this->mail;     
        }
    } 
