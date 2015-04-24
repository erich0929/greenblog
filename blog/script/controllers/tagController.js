// tagController.js

angular.module ('erich0929.controller').controller ('tagController', 
	['$scope', 'tag', 'TagService', '$sce', 'articles', function ($scope, tag,TagService, $sce, articles) {

		makeTrustHtml (articles);
		$scope.articles = articles;

		$scope.getMore = function () {
			var articles = $scope.articles;
			var lastArticle = articles [articles.length - 1];
			var tagService = new TagService ();
			tagService.getMoreArticles (tag, lastArticle, function (records) {
				if (records) {
					makeTrustHtml (records);
					$scope.articles = articles.concat (records);
				} else {
				// do nothing.
			}
		});
		};

		function makeTrustHtml (articles) {
			var tagService = new TagService ();
			for (var i = 0; i < articles.length; i++) {
				var article = articles [i];
				article.content = tagService.filter (article.content);
				article.content = $sce.trustAsHtml (article.content);
			};
		}

}]);