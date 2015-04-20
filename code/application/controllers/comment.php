<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Comment extends CI_Controller {

	public function __construct () {
		parent::__construct ();
		$this -> load -> database ();
		$this -> load -> library('facebook/src/Facebook/facebook_package');
		$this -> load -> model ('facebookHelper');
		$this -> load -> model ('commentMapper');
	}

	public function index () {
		//$token = 'CAAHhdGbM2uMBAHgWoRzyy5xVUfPOeyHCQ3nU2QqKkCLHtzioa2QcG5LrPgZBqY8bh2Xdz7yXc8wnWO5fl9kzmBijmnhlhHddE1wZB1BDKduK7Q2TuPi4rd8VtcL759dkP8u1vmk8gYE2mpATcD0QEmNZBRA2TxeLwZABxnftQlfTOuGG1NWTU0CfTMTfRM3o7zcGeobgiYmPewlYsrWEHWZCUnezxe38ZD'; 
		$content = $this -> input -> post ('content');
		$token = $this -> input -> post ('token');
		$content = $this -> input -> post ('content');
		//$content = 'love';
		$articleId = $this -> input -> post ('articleId');
		$user = $this -> facebookHelper -> getUser ($token);

		$comment = array ();
		$comment ['user'] = $user ['userName'];
		$comment ['email'] = $user ['email'];
		$comment ['articleId'] = $articleId;
		$comment ['content'] = $content;
		
		header ('Content-Type: application/json');
		$result = $this -> commentMapper -> postComment ($comment);
		if ($result) {
			$comments = $this -> commentMapper -> getComments ($articleId);
			echo json_encode(array ('status' => true, 'comments' => $comments));
		} else {
			echo json_encode(array ('status' => false)); 
		}
	}

	public function all () {
		$articleId = $this -> input -> get ('articleId');
		$result = $this -> commentMapper -> getComments ($articleId);
		header ('Content-Type: application/json');
		echo json_encode ($result);
	} 

}