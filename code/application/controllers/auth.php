<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct () {
		parent::__construct ();
		$this -> load -> library ('form_validation');
		$this -> load -> model ('authmapper');

		$auth_method = ["update", "logout"];

		$RTR =& load_class ('Router', 'core');
		$method = $RTR->fetch_method();

		if (in_array($method, $auth_method) AND !$this -> session -> userdata ('admin') ) {
			header ('Location: http://admin.erich0929.com/#/login');
			exit ();
		}
	}

	public function isLogined () {
		$admin = $this -> session -> userdata ('admin');
		header ('Content-Type: application/json');
		if ($admin) {
			echo json_encode(array ('isLogined' => true));
		} else {
			echo json_encode(array ('isLogined' => false));
		}
	}

	public function login () {
		$this -> form_validation -> set_rules ('id', 'id', 'required');
		$this -> form_validation -> set_rules ('password', 'password', 'required');

		$id = $this -> input -> post ('id');
		$password = $this -> input -> post ('password');
		
		if (!$this -> form_validation -> run ()) {
			header('Content-Type: application/json');
			echo json_encode(array ('isLogined' => false));
		} else {
			$isLogined = $this -> authmapper -> login ($id, $password);
			if ($isLogined) {
				$this -> session -> set_userdata ('admin', true);
			}
			header('Content-Type: application/json');
			echo json_encode(array ('isLogined' => $isLogined));
		}
	}

	public function logout () {
		$this -> session -> unset_userdata ('admin');
		header ('Location: http://admin.erich0929.com/#/login');
		exit ();
	}

	public function update () {
		$this -> form_validation -> set_rules ('password', 'password', 'required|min_length[7]');
		$password = $this -> input -> post ('password');
		header('Content-Type: application/json');
		if (!$this -> form_validation -> run ()) {
			echo json_encode(array ('update' => false, 'error' => 'invalid form data.'));
		} else {
			if ($this -> authmapper -> setPassword ($password)) {
				echo json_encode(array ('update' => true));
			} else {
				echo json_encode(array ('update' => false, 'error' => 'database error.'));
			}
		}
	}
}