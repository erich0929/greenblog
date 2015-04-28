// authService.js

angular.module ('erich0929.service')
	.factory ('AuthService', 
		['$resource', function ($resource) {
	var constructor = function () {};

	// public api
	constructor.prototype.isLogined = function (callback) {
		var success = callback || function () {};
		var resource = $resource ('/code/auth/isLogined');
		return resource.get (callback);
	};

	return constructor;
}]);