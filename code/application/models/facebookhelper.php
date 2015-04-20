<?php 
	use Facebook\FacebookSession;
	use Facebook\FacebookRedirectLoginHelper;
	use Facebook\FacebookRequest;
	use Facebook\FacebookResponse;
	use Facebook\FacebookSDKException;
	use Facebook\FacebookRequestException;
	use Facebook\Helpers\FacebookJavaScriptLoginHelper;
	use Facebook\FacebookAuthorizationException;
	use Facebook\GraphObject;
	use Facebook\Entities\AccessToken;
	use Facebook\HttpClients\FacebookCurlHttpClient;
	use Facebook\HttpClients\FacebookHttpable;

if (!defined ('BASEPATH')) exit ('No direct script access allowed');

class FacebookHelper extends CI_Model {

	public function __construct () {
		parent::__construct ();
	}

	public function getUser ($token) {
		
		FacebookSession::setDefaultApplication('529365033868003',
			'09b5bd7785b5ec90b231136b4bd7b9da');

		$session = new FacebookSession($token);
		if (!$session -> validate ()) {
			return false; 
		}

		$request = new FacebookRequest( $session, 'GET', '/me');
		$response = $request -> execute();

		$graphObject = $response -> getGraphObject();
		$fbid = $graphObject -> getProperty ('id');
		$userName = $graphObject -> getProperty ('name');
		$email = $graphObject -> getProperty ('email');
		return (array ('fbid' => $fbid, 'userName' => $userName, 'email' => $email));
		
	}
}