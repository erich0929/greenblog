
// archiveController.js

angular.module ('erich0929.controller')
	.controller ('archiveController', ['$scope', 'ArchiveService', 'archives', 'domain',
		function ($scope, ArchiveService, archives, domain) {
	$scope.domain = domain;
	$scope.archives = archives;

	$scope.updateArchive = function () {
		var archiveService = new ArchiveService ();
		archiveService.updateArchive (function (result) {
			if (result.status) {
				console.log (result.archives);
				$scope.archives = result.archives;
				alert ("Update to complete!");
			} else {
				alert ("Update to failed.");
			}
		});
	}


}]);