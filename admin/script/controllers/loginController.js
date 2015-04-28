// loginController.js

angular.module ('erich0929.controller').controller ('loginController', 
	['$scope', 'auth', '$location', function ($scope, auth, $location) {

	if (auth.isLogined) {
		console.log ('isLogined : ' + auth.isLogined);
		location.href='http://admin.erich0929.com/#/category';
	}
	$ ("#login").submit (function (e) {
		e.preventDefault ();
		var formdata = $ ('#login').serialize ();
		$.ajax ({
			url : '/code/auth/login',
			data : formdata,
			type : 'post',
			success : function (data) {
				if (data.isLogined) {
					console.log ('logined');
					location.href='http://admin.erich0929.com/#/category';	
				} else {
					$('#message').html ('<p style="color: red;">Fail to login.</p>');
				}
			},
			error : function (e) {
				$ ('#message').html (e);
			}
		});
		return false;
	});

	$scope.login = function () {
		$ ("#login").submit ();
	};

}]);