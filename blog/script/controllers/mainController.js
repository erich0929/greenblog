// mainController.js

angular.module ('erich0929.controller').controller ('mainController', ['$scope', 'topArticles', function ($scope, topArticles) {
	
	$scope.topArticles = topArticles;
	
}]);