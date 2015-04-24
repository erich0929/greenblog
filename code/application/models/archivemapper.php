<?php if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class ArchiveMapper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	} 

	public function getArchives () {
		$sql = "SELECT * FROM `Archives`";
		$resultId = $this -> db -> query ($sql);
		return $resultId -> result ();
	}

	public function getArchive ($id) {
		$sql = "SELECT * FROM `Archives` WHERE `archiveId` = {$id}";
		$resultId = $this -> db -> query ($sql);
		$result = $resultId -> result ();
		if ($result) {
			return $result [0];
		} else {
			return false;
		}
	}

	public function updateArchive () {
		$this -> db -> trans_start ();
		$truncateSql = "TRUNCATE TABLE `Archives`";

		$this -> db -> query ($truncateSql);
		$archives = $this -> makeArchives ();
		$length = count ($archives);

		for ($i = 0; $i < $length; $i++) {
			$this -> storeArchive ($archives [$i]);
		}
		$result = $this -> db -> trans_complete ();
		if ($result) {
			return $archives;
		} else {
			return false;
		}
	}

	private function storeArchive ($archive) {
		$sql = "INSERT INTO `Archives` (`archiveId`, `rss`) " .
				"VALUES ({$archive ['archiveId']}, '{$archive ['rss']}')";
		return $this -> db -> query ($sql);
	}

	public function makeArchives () {
		$archives = array ();
		$allArticlesSql = "SELECT * FROM `Articles`";
		$resultId = $this -> db -> query ($allArticlesSql); 
		
		/* this array has object that has properties as table's column */
		$articles = $resultId -> result (); 

		/* init */
		$currentArchiveId = 0;	
		$currentRssDocument = "";
		$length = count ($articles);

		
		$closeDoc = "</channel></rss>";
		for ($i = 0; $i < $length; $i++) {
			$tempArchiveId = $this -> getArchiveId ($articles [$i]);
			if ($currentArchiveId == $tempArchiveId) {
				$rssElement = $this -> getRssElement ($articles [$i]);
				$currentRssDocument = $currentRssDocument . $rssElement;	
				/* for last element */
				if ($i = $length -1) {
					/* close doc */
					$currentRssDocument = $currentRssDocument . $closeDoc;
					/* store prev doc */
					$rssDocument = array ('archiveId' => $currentArchiveId, 'rss' => $currentRssDocument);
					array_push ($archives, $rssDocument);
				}		
			} else {
				if ($currentArchiveId) {
					/* close prev doc */
					$currentRssDocument = $currentRssDocument . $closeDoc;
					/* store prev doc */
					$rssDocument = array ('archiveId' => $currentArchiveId, 'rss' => $currentRssDocument);
					array_push ($archives, $rssDocument);
				}
				/* new current doc */
				$currentArchiveId = $tempArchiveId;
				/* open new doc */
				$currentRssDocument = $this -> openDoc ($articles [$i]);
			}
		}
		return $archives;
	}
	private function getArchiveId ($articleObj) {
		$year = $this -> getYear ($articleObj);
		$month = $this -> getMonth ($articleObj);
		return strtotime($year.$month.'01');
	}
	private function getYear ($articleObj) {
		return date ('Y', $articleObj -> date);
	}
	private function getMonth ($articleObj) {
		return date ('m', $articleObj -> date);
	}

	private function getRssElement ($articleObj) {
		$open = "<item>";
		$close = "</item>";
		$title = "<title>{$articleObj -> title}</title>";
		$link = "<link>http://blog.erich0929.com/#/article/{$articleObj -> articleId}</link>";
		$description = "<description>{$articleObj -> tags}</description>";
		return $open . $title . $link . $description . $close;
	}

	private function openDoc ($articleObj) {
		$openDoc = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><rss version=\"2.0\"><channel>";
		$year = $this -> getYear ($articleObj);
		$month = $this -> getMonth ($articleObj);
		$title = "<title>My blog</title>";
		$link = '<link>' . "http://blog.erich0929.com</link>";
		$description = "<description>{$year}/{$month}</description>";
		return $openDoc . $title . $link . $description;
	}
}