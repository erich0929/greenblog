<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Upload extends CI_Controller {
	
	public function __construct () {
		parent::__construct ();
		
		$config = array (
			'upload_path' => '../blog/uploads',
			'allowed_types' => 'gif|jpg|png',
			'encrypt_name' => true,
			'max_size' => '1000'
		);

		$this -> load -> library ('upload', $config);
	}

	public function image () {
		header ('Content-Type: application/json');
		if (!$this -> upload -> do_upload ('uploadFile')) {
			$error = $this -> upload -> display_errors ();
			echo json_encode (array ('status' => false, 'error' => $error));
		} else {
			$uploadData = $this -> upload -> data ();
			$url = 'http://blog.erich0929.com/uploads/' . $uploadData ['file_name'];
			echo json_encode (array ('status' => true, 'url' => $url));
		}
	}
}