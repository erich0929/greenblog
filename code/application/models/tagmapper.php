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

}