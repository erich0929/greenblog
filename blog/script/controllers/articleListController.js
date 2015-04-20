// articleListController.js

angular.module ('erich0929.controller').controller ('articleListController', 
	['$scope', 'articles', 'CategoryService', '$sce',
	function ($scope, articles, CategoryService, $sce) {

	if (articles.status) {
		makeTrustHtml (articles.articles);
		$scope.articles = articles.articles;
	}

	$scope.getMore = function () {
		var articles = $scope.articles;
		var lastArticle = articles [articles.length - 1];
		var categoryService = new CategoryService ();
		categoryService.getMoreArticles (lastArticle, function (records) {
			if (records.status) {
				makeTrustHtml (records.articles);
				$scope.articles = articles.concat (records.articles);
			} else {
				// do nothing.
			}
		});
	};

	function makeTrustHtml (articles) {
		var categoryService = new CategoryService ();
		for (var i = 0; i < articles.length; i++) {
			var article = articles [i];
			article.content = categoryService.filter (article.content);
			article.content = $sce.trustAsHtml (article.content);
		};
	}
}]);