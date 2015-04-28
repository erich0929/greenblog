// changePasswordController.js

angular.module ('erich0929.controller').controller ('changePasswordController', 
	['$scope', 
	function ($scope) {

	$ ('#changePassword').submit (function (e) {
		e.preventDefault ();
		var formdata = $ ('#changePassword').serialize ();
		$.ajax ({
			url : "/code/auth/update",
			type : 'post',
			data : formdata,
			success : function (data) {
				if (data.update) {
					location.href = "/#/category";
				} else {
					$ ('#message').html ('<p style="color: red;">Fail to change password. <br/> error : ' + data.error + '</p>');
				}
			},
			error : function (data) {
				$ ('#message').html (e);
			}
		});
		return false;
	});

	$scope.changePassword = function () {
		$ ('#changePassword').submit ();
	};

	$scope.confirmPassword = function () {
		var source = $ ('#source').val ();
		var retype = $ ('#retype').val ();
		if (source != retype) {
			$ ('#message').html ('<p style="color: red;">Not match password.</p>');
		} else {
			if (source.length < 7) {
				$ ('#message').html ('<p style="color: red;">Too short password.</p>');
			} else {
				$ ('#message').html ('<p style="color: green;">Ok, ready to change.</p>');
			}
		}
	};
}]);