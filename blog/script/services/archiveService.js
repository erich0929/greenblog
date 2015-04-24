// archiveService.js

angular.module ('erich0929.service')
	.factory ('ArchiveService', 
		['$resource', 'domain', function ($resource, domain) {

	var constructor = function () {};

	// public api
	constructor.prototype.getArchives = function (callback) {
		var success = callback || function () {};
		var resource = $resource (domain + "/code/archive");
		return resource.query (success);
	};

	constructor.prototype.updateArchive = function (callback) {
		var success = callback || function () {};
		var resource = $resource (domain + "/code/archive/update");
		return resource.query (success);
	};

	return constructor;

}]);