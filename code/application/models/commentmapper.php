<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class CommentMapper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	}

	public function postComment ($comment) {
		$sql = "INSERT INTO `Comments` (`articleId`, `user`, `email`, `content`, `date`) " . 
			"VALUES ('{$comment ['articleId']}', '{$comment ['user']}', '{$comment ['email']}', '{$comment ['content']}', UNIX_TIMESTAMP(NOW()))";
		return $this -> db -> query ($sql);
	}

	public function getComments ($articleId) {
		$sql = "SELECT * FROM `Comments` WHERE `articleId` = '{$articleId}'	 ORDER BY `date` DESC";
		$query = $this -> db -> query ($sql);
		return $query -> result ();
	}

}