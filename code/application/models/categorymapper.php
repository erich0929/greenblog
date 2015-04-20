<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class CategoryMapper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	}

	public function getCategories () {
		$sql = 'SELECT * FROM `Category`';
		$query = $this -> db -> query ($sql);
		$categories = $query -> result ();
		return $categories;
	}

	public function createCategories ($name, $desc) {
		$sql = "INSERT INTO `Category` (`name`, `description`) VALUES ('{$name}', '{$desc}')";
		return $this -> db -> query ($sql);
	}

	public function deleteCategory ($name) {
		$sql = "DELETE FROM `Category` WHERE `name` = '{$name}'";
		return $this -> db -> query ($sql);
	}

}