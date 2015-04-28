<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {
	public function __construct () {
		parent::__construct ();
		echo 'a';
		$this -> load -> library ("session");
		$RTR =& load_class ('Router', 'core');
		$this -> method = $RTR->fetch_method();
		//$this -> load -> secret_hook ();
		$auth_method = ["index"];
		$RTR =& load_class ('Router', 'core');
		$method = $RTR->fetch_method();

		if (in_array($method, $auth_method) AND !$this -> session -> userdata ("auth")) {
			header ("Location: /test/login");
		}
	}
	public function index () {
		echo "you are logined.";
	}
	public function login () {
		echo "you need to login";
		$this -> session -> set_userdata ('auth', true);
	}
}