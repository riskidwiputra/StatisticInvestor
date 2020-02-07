<?php 

	/**
	 * 
	 */
	class Model
	{
		protected $db; 

		protected $app;

		public function __construct()
		{ 
			$this->db = new Database;  
			$this->ctr 	= new Controller; 
		}  
	}