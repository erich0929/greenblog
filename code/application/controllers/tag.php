<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class tag extends CI_Controller {

	public function __construct () {
		parent::__construct ();
		$this -> load -> database ();
		$this -> load -> model ('tagMapper');
		$this -> load -> model ('articleMapper');
	}

	public function index () {
		$result = $this -> tagMapper -> getTags ();
		header('Content-Type: application/json');
		echo json_encode ($result);
	}
}