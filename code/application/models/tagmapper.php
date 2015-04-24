<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class TagMapper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	}

	public function getTags () {
		$sql = "SELECT `tag`, count(*) AS count FROM `Tags` GROUP BY `tag` ORDER BY count DESC LIMIT 20";
		$query = $this -> db -> query ($sql);
		$result = $query -> result ();
		return $result;
	}

	public function getFirstArticles ($tag, $limit) {
		$sql = "SELECT a.* FROM `Articles` a INNER JOIN `Tags` t" .
				" ON a.articleId = t.articleId WHERE t.tag = '{$tag}' ORDER BY a.articleId DESC limit {$limit}";
		$resultId = $this -> db -> query ($sql);
		return $resultId -> result ();
	}

	public function getMoreArticles ($tag, $limit, $articleId) {
		$sql = $sql = "SELECT a.* FROM `Articles` a INNER JOIN `Tags` t" .
				" ON a.articleId = t.articleId WHERE t.tag = '{$tag}' AND a.articleId < '{$articleId}' ORDER BY a.articleId DESC limit {$limit}";
		$resultId = $this -> db -> query ($sql);
		return $resultId -> result ();
	}

}