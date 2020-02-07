<?php

	/**
	 * 
	 */
	class Database
	{
		private $host = DB_HOST;
		private $user = DB_USER;
		private $pass = DB_PASS; 
		private $db_name = DB_NAME;

		private $dbh;
		private $stmt;

		private $table;

		public function __construct()
		{
			//data source nanme
			$dsn = 'mysql:host='.$this->host.';dbname='.$this->db_name;

			$option = [
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			];

			try {
				$this->dbh = new PDO($dsn, $this->user, $this->pass, $option);
			} catch(PDOException $e) {
				die($e->getMessage());
			} 
		}

		public function query($query)
		{
			$this->stmt = $this->dbh->prepare($query);
		}
		public function connection(){
			return mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);
		}

		public function bind($param, $value, $type = null)
		{
			if (is_null($type)) {
				switch (true) {
					case is_int($value):
						$type = PDO::PARAM_INT;
						break;
					
					case is_bool($value):
						$type = PDO::PARAM_BOOL;
						break;

					case is_null($value):
						$type = PDO::PARAM_NULL;
						break; 

					default:
						$type = PDO::PARAM_STR;
						break;
				}
			}

			$this->stmt->bindValue($param, $value, $type);
		}

		public function execute()
		{
			$this->stmt->execute();
		}

		public function resultSet()
		{
			$this->execute();
			return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		
		public function single()
		{ 
			$this->execute();
			return $this->stmt->fetch(PDO::FETCH_ASSOC);
		}		

		public function rowCount()
		{
			return $this->stmt->rowCount();
		}


		//query AUTO
		function table($name) {
			$this->table = $name;
			return $this;
		}

		public function selectAll() { 
			$data = "SELECT * FROM ";
			$data .= $this->table; 
			
			// $this->stmt = $this->dbh->prepare($data);
			$this->query($data);
			// var_dump($data);die;
			return $this->resultSet();
		}
		public function selectSingle() { 
			$data = "SELECT * FROM ";
			$data .= $this->table; 
			
			// $this->stmt = $this->dbh->prepare($data);
			$this->query($data);
			// var_dump($data);die;
			return $this->single();
		}
		public function all() { 
			$data = "SELECT * FROM ";
			$data .= $this->table; 
			
			// $this->stmt = $this->dbh->prepare($data);
			$this->query($data);
			// var_dump($data);die;
			return $this->execute();
		}
		public function selectWhere(array $where)
		{
			// $this->table = "user";
			$sql = "SELECT * FROM ";
			$sql .= $this->table. ' WHERE';
			foreach ($where as $field => $value) {
			$sql .= " ".$field."= '".$value."' AND";
			}
			$sql = rtrim($sql, 'AND');
			$this->query($sql);
			foreach ($where as $field => $value) {
				$this->bind($field, $value);
			}
			return $this->single();

		}
		public function selectAllWhere(array $where)
		{
			// $this->table = "user";
			$sql = "SELECT * FROM ";
			$sql .= $this->table. ' WHERE';
			foreach ($where as $field => $value) {
			$sql .= " ".$field."= '".$value."' AND";
			}
			$sql = rtrim($sql, 'AND');
			$this->query($sql);
			foreach ($where as $field => $value) {
				$this->bind($field, $value);
			}
			return $this->resultSet();

		}
		public function where($where1, $where2 = null)
		{ 
			// var_dump($_SERVER);die;
			$sql = "SELECT * FROM ";
			$sql .= $this->table. ' WHERE';
			if (is_array($where1)) {
				foreach ($where1 as $field => $value) {
					$sql .= " ".$field." = '".$value."' AND";
				}
				$sql = rtrim($sql, 'AND');
			} else {
				$sql .= " ".$where1." = '".$where2."'";
			}
			$this->query($sql);
			if (is_array($where1)) {
				foreach ($where1 as $field => $value) {
					$this->bind($field, $value);
				}
			} else {
				$this->bind($where1 ,$where2);
			}
			return $this->single();

		}
		public function whereAll($where1, $where2 = null)
		{ 
			// var_dump($_SERVER);die;
			$sql = "SELECT * FROM ";
			$sql .= $this->table. ' WHERE';
			if (is_array($where1)) {
				foreach ($where1 as $field => $value) {
					$sql .= " ".$field." = '".$value."' AND";
				}
				$sql = rtrim($sql, 'AND');
			} else {
				$sql .= " ".$where1." = '".$where2."'";
			}
			$this->query($sql);
			if (is_array($where1)) {
				foreach ($where1 as $field => $value) {
					$this->bind($field, $value);
				}
			} else {
				$this->bind($where1 ,$where2);
			}
			return $this->resultSet();

		}
		
		public function selectFrom($select, $where = array())
		{
			// $this->table = "user";
			$sql = "SELECT ". $select ." FROM ";
			$sql .= $this->table. ' WHERE';
			foreach ($where as $field => $value) {
			$sql .= " ".$field."= '".$value."' AND";
			}
			$sql = rtrim($sql, 'AND');
			$this->query($sql);
			foreach ($where as $field => $value) {
				$this->bind($field, $value);
			}
			return $this->single();
			

		}
		public function countRows($data, $data2 = null)
		{
			$sql = "SELECT * FROM ";
			$sql .= $this->table. ' WHERE';	
			if (is_array($data)) {
				foreach ($data as $field => $value) {
					$sql .= " ".$field." = '".$value."' AND";
				}
				$sql = rtrim($sql, 'AND');
			} else {
				$sql .= " ".$data." = '".$data2."'";
			}
			$this->query($sql);
			if (is_array($data)) {
				foreach ($data as $field => $value) {
					$this->bind($field, $value);
				}
			} else {
				$this->bind($data ,$data2);
			} 
			$this->execute();
			return $this->rowCount();			

		}
		public function update ($data = array(), $where = array()){
			// var_dump($data);die;
			
			$sql = "UPDATE ";
			$sql .= $this->table. ' SET';
			foreach ($data as $field => $value) {
			$sql .= " ".$field." = '".$value."' ,";
			}
			$sql = rtrim($sql, ',');
			$sql .= "WHERE";
			foreach ($where as $field => $value) {
			$sql .= " ".$field." = '".$value."' AND";
			}
			$sql = rtrim($sql, ' AND');

			// var_dump($sql);die;
			$this->query($sql); 
			foreach ($data as $field => $value) {
				$this->bind($field, $value);
			}
			foreach ($where as $field => $value) {
				$this->bind($field, $value);
			}
			$this->execute();

			return $this->rowCount();
		}

		public function insert(array $data) { 
			$sql = "INSERT INTO ";
			$sql .= $this->table . ' (';
	        foreach($data as $field => $value){
	            $sql .= "".$field.",";
	        } 
	        $sql = rtrim($sql, ',');
	        $sql .= ") VALUES ("; 
	        foreach($data as $field => $value){
	            $sql .= ":".$field.",";

	        } 
	        $sql = rtrim($sql, ',').')';

	        $this->query($sql);
	        
	        foreach($data as $field => $value){ 
	            $this->bind($field, $value);
	        } 
	        $this->execute(); 
	        return true; 
		}


		public function delete($data)
		{
			$sql = "DELETE FROM ";
			$sql .= $this->table. ' WHERE';
			foreach($data as $field => $value){
	            $sql .= " ".$field."= '".$value."' AND";
	        } 
			$sql = rtrim($sql, 'AND');

			$this->query($sql);
			foreach ($data as $field => $value) {
				$this->bind($field, $value);
			}
			$this->execute(); 
			return $this->rowCount();
		}
		
	}