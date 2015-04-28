<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Category extends CI_Controller {

	public function __construct () {
		parent::__construct ();
		$this -> load -> database ();
		$this -> load -> library ('form_validation');
		$this -> load -> library ('session');
		$this -> load -> model ('categoryMapper');
		$this -> load -> model ('articleMapper');
		
		$auth_method = ["create", "delete", "newArticle", "deleteArticle", "editArticle"];

		$RTR =& load_class ('Router', 'core');
		$method = $RTR->fetch_method();

		if (in_array($method, $auth_method) AND !$this -> session -> userdata ('admin') ) {
			header ('Location: http://admin.erich0929.com/#/login');
			exit ();
		}
	}

	public function index()
	{
		$categories = $this -> categoryMapper -> getCategories ();
		header ('Content-Type: application/json');
		echo json_encode ($categories);
	}

	public function create () {
		$name = $this -> input -> post ('name');
		$desc = $this -> input -> post ('desc');
		$result = $this -> categoryMapper -> createCategories ($name, $desc);
		if ($result) {
			header ('Content-Type: application/json');
			echo json_encode (
				array ('status' => true, 
					'category' => array ('name' => $name, 'description' => $desc)));
		} else {
			header ('Content-Type: application/json');
			echo json_encode (array ('status' => false));
		}
	}

	public function delete () {
		$name = $this -> input -> post ('name');
		$result = $this -> categoryMapper -> deleteCategory ($name);
		if ($result) {
			header ('Content-Type: application/json');
			echo json_encode (array ('status' => true));
		} else {
			header ('Content-Type: application/json');
			echo json_encode (array ('status' => false, 'name' => $name));
		}
	}

	public function article () {
		$articleId = $this -> input -> get ('id');
		$result = $this -> articleMapper -> getArticle ($articleId);
		header ('Content-Type: application/json');
		echo json_encode ($result [0]);
	}

	public function fetchFirst () {
		$category = $this -> input -> get ('category');
		$limit = $this -> input -> get ('limit');
		$result = $this -> articleMapper -> getFirstArticles ($category, $limit);
		header ('Content-Type: application/json');
		if ($result) {
			echo json_encode (array ('status' => true, 'articles' => $result));
		} else {
			echo json_encode (array ('status' => false));
		}
	}

	public function fetchMore () {
		$category = $this -> input -> get ('category');
		$lessThanArticleId = $this -> input -> get ('articleId');
		$limit = $this -> input -> get ('limit');
		$result = $this -> articleMapper -> getMoreArticles ($category, $lessThanArticleId, $limit);
		header ('Content-Type: application/json');
		if ($result) {
			echo json_encode (array ('status' => true, 'articles' => $result));
		} else {
			echo json_encode (array ('status' => false));
		}
	}

	private function processArticle ($method) {
		$this -> form_validation -> set_rules ('category', 'category', 'required');
		$this -> form_validation -> set_rules ('title', 'title', 'required|max_length[100]');
		$this -> form_validation -> set_rules ('author', 'author', 'required|max_length[30]');
		$this -> form_validation -> set_rules ('content', 'content', 'required');
		$this -> form_validation -> set_rules ('tags', 'tags', 'required');

		$article = array ();
		$article ['category'] = $this -> input -> post ('category');
		$article ['title'] = $this -> input -> post ('title');
		$article ['author'] = $this -> input -> post ('author');
		$article ['content'] = $this -> input -> post ('content');
		$article ['tags'] = explode (',', $this -> input -> post ('tags'));
		$article ['md5'] = time () . md5 (time () . rand ());
		
		if ($this -> form_validation -> run () == false) {
			//$message = validation_errors ();
			header ('Location: http://admin.erich0929.compact(varname)m/#/error/post?msg=' . $message);
			return;
		}
		print_r ($article);
		if ($method == 'new') {
			$result = $this -> articleMapper -> createArticle ($article);
		} else {
			$article ['articleId'] = $this -> input -> post ('articleId');
			$result = $this -> articleMapper -> updateArticle ($article);
		}
		
		if ($result) {
			header ('Location: http://admin.erich0929.com/#/category/' . $article ['category']);
		} else {
			header ('Location: http://admin.erich0929.com/#/error/post');
		}

	}

	public function newArticle () {
		$this -> processArticle ('new');
	}

	public function editArticle () {
		$this -> processArticle ('edit');
	}

	public function deleteArticle () {
		$articleId = $this -> input -> post ('id');
		$result = $this -> articleMapper -> deleteArticle ($articleId);
		header ('Content-Type: application/json');
		if ($result) {
			echo json_encode (array ('status' => true));
		} else {
			echo json_encode (array ('status' => false));
		}
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */