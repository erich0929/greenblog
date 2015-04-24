<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class ArticleMapper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	}

	public function getTopArticles () {
		$sql = "SELECT * FROM `Articles` ORDER BY `articleId` DESC LIMIT 5";
		$query = $this -> db -> query ($sql);
		$topArticles = $query -> result (); 
		return $topArticles;
	}

	public function getArticle ($articleId) {
		$articleSql = "SELECT * FROM `Articles` WHERE `articleId` = '{$articleId}'";
		$article = $this -> db -> query ($articleSql);
		$article = $article -> result ();
		$tagSql = "SELECT * FROM `Tags` WHERE `articleId` = '{$articleId}'";
		$tagResult = $this -> db -> query ($tagSql);
		$tagResult = $tagResult -> result ();
		$tags = array ();
		for ($i=0;$i<count ($tagResult);$i++) {
			array_push ($tags, $tagResult [$i] -> tag);
		}
		$article [0] -> tags = $tags;
		return $article;
	}

	public function getFirstArticles ($category, $limit) {
		$sql = "SELECT * FROM `Articles` WHERE `category` = '{$category}' ORDER BY `articleId` DESC LIMIT {$limit}";
		$result = $this -> db -> query ($sql);
		return $result -> result ();
	}

	public function getMoreArticles ($category, $articleId, $limit) {
		$sql = "SELECT * FROM `Articles` WHERE `category` = '{$category}' AND `articleId` < '{$articleId}' ORDER BY `articleId` DESC LIMIT {$limit}";
		$result = $this -> db -> query ($sql);
		return $result -> result ();
	}

	public function createArticle ($article) {
		$category = $article ['category'];
		$title = $article ['title'];
		$content = $article ['content'];
		$author = $article ['author'];
		$md5 = $article ['md5'];
		$tags = $article ['tags'];
		$tagString = implode(',', $tags);
		$i = 0;
		
		$articleSql = "INSERT INTO `Articles` (`articleId`, `category`, `title`, `content`, `author`, `date`, `tags`)"
				. "VALUES ('{$md5}', '{$category}', '{$title}', '{$content}', '{$author}', unix_timestamp(now()), '{$tagString}')";
		
		$this -> db -> trans_start ();

		$this -> db -> query ($articleSql);
		
		for ($i = 0; $i < count($tags); $i++) {	
		
		$tagSql = "INSERT INTO `Tags` (`articleId`, `tag`) VALUES ('{$md5}', '{$tags [$i]}')";
		//echo $tagSql;
			$this -> db -> query ($tagSql);
		} 

		return $this -> db -> trans_complete ();
	}

	public function updateArticle ($article) {
		$category = $article ['category'];
		$title = $article ['title'];
		$content = $article ['content'];
		$author = $article ['author'];

		$articleId = $article ['articleId'];

		/*
		$sql = "UPDATE `Articles` SET `category` = '{$category}', `title` = '{$title}', `content` = '{$content}', `author` = '{$author}'"
				. " WHERE `articleId` = {$articleId}";
		*/
		if ($this -> deleteArticle ($articleId)) {
			return $this -> createArticle ($article);
		} else {
			return false;
		}
	}

	public function deleteArticle ($articleId) {
		$sql = "DELETE FROM `Articles` WHERE `articleId` = '{$articleId}'";
		return $this -> db -> query ($sql);
	}
}