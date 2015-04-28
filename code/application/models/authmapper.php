<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class AuthMapper extends CI_Model {
	public function __construct () {
		parent::__construct ();
	}

	public function login ($id, $password) {

		$sql = "SELECT * FROM `Auth` where `id` = '{$id}'";
		if (!$resultId = $this -> db -> query ($sql)) {
			return false;
		};
		if (!$admin = $resultId -> result ()) {
			return false;
		};
		$adminId = $admin [0] -> id;
		$adminMD5 = $admin [0] -> password;

		$offset = 10;
		
		$salt = substr($adminMD5, 0, $offset);
		$md5 = substr($adminMD5, $offset);
		if (md5 ($salt . $password) == $md5) {
			return true;
		} else {
			return false;
		}
	}

	public function setPassword ($password) {
		$salt = $this -> randString ();
		$md5 = md5 ($salt . $password);
		$salted = $salt . $md5;
		$sql = "UPDATE `Auth` SET `password` = '{$salted}' WHERE `id` = 'admin'";
		return $this -> db -> query ($sql);
	}

	private function randString($length = 10) {
    	return substr (str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
	}

}


