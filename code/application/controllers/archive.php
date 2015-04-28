<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Archive extends CI_Controller {
	public function __construct () {
		parent::__construct ();
		$this -> load -> database ();
		$this -> load -> model ('archivemapper');

		$auth_method = ["update"];

		$RTR =& load_class ('Router', 'core');
		$method = $RTR->fetch_method();

		if (in_array($method, $auth_method) AND !$this -> session -> userdata ('admin') ) {
			header ('Location: http://admin.erich0929.com/#/login');
			exit ();
		}
	}
	public function index () {
		if ($id = $this -> input -> get ('id')) {
			$archive = $this -> archivemapper -> getArchive ($id);
			if ($archive) {
				header ('Content-Type: text/xml');
				echo $archive -> rss;
			} else {
				header("HTTP/1.0 404 Not Found");
				echo "No page found";
				exit;
			}
			return;
		}
		$archives = $this -> archivemapper -> getArchives ();
		header ('Content-Type: application/json');
		echo json_encode ($archives);
	}

	/* if nothing to update then return status false. */
	public function update () {
		$result = $this -> archivemapper -> updateArchive ();
		header("Content-Type: application/json");
		if ($result) {
			echo json_encode(array ('status' => true , 'archives' => $result));
		} else {
			echo json_encode(array ('status' => false));
		}
	}
}