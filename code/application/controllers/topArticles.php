<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TopArticles extends CI_Controller {

	public function __construct () {

		parent::__construct ();
		$this -> load -> database ();
		$this -> load -> model ('articleMapper');
	}

	public function index()
	{
		$topArticles = $this -> articleMapper -> getTopArticles ();
		header ('Content-Type: application/json');
		echo json_encode ($topArticles);
	}
}
