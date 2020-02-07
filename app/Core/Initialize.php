<?php 
	
	class Initialize {
		public $db; 
		public $ctr;

		public $app;

		public function __construct()
		{
			new App; 
			$this->db = new Database;  
			$this->ctr 	= new Controller; 
		}  
	}

	new Initialize;
	// new App;
	// new Route;
	// $this->ctr = new Controller;
	// $this->db = new Database;