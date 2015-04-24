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

	public function articles () {
		$tag = $this -> input -> get ('tag');
		$limit = $this -> input -> get ('limit');
		
		if (!$tag OR !$limit) {
			header('HTTP/1.0 404 Not Found');
			exit;
		}

		header ('Content-Type: application/json');		
		if ($articleId = $this -> input -> get ('articleId')) {
			$articles = $this -> tagMapper -> getMoreArticles ($tag, $limit, $articleId);
		} else {
			$articles = $this -> tagMapper -> getFirstArticles ($tag, $limit);
		}
		echo json_encode($articles);
	}
}