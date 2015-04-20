
// articleService.js

angular.module ('erich0929.service').factory ('ArticleService', ['$resource', 'domain', function ($resource, domain) {

	var constructor = function () {

	};

	// public api

	constructor.prototype.getArticle = function (articleId, callback) {
		var success = callback || function () {};
		var endpoint = '/code/category/article';
		console.log (domain + endpoint + '?id=' + articleId);
		var resource = $resource (domain + endpoint + '?id=' + articleId);
		return resource.get (success);
	};

	return constructor;

}]);