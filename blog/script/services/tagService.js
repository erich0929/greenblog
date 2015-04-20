// tagService.js

angular.module ('erich0929.service').factory ('TagService', 
	['$resource', function ($resource) {

	var constructor = function () {

	};

	// public api
	constructor.prototype.getTags = function (callback) {
		var success = callback || function () {};
		var resource = $resource ('/code/tag');
		return resource.query (success);
	};

	return constructor;
}]);