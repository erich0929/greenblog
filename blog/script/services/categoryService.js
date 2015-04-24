// category.js


angular.module ('erich0929.service')
	.factory ('CategoryService', ['$resource', 'domain', 'dumpSize', function ($resource, domain, dumpSize) {

	var constructor = function () {
		this.dumpSize = dumpSize;
	};

	// public api
	constructor.prototype.getArticle = function (articleId, callback) {
		var success = callback || function () {};
		var endpoint = '/code/category/article';
		console.log (domain + endpoint + '?id=' + articleId);
		var resource = $resource (domain + endpoint + '?id=' + articleId);
		return resource.get (success);
	};

	constructor.prototype.getFirstArticles = function (category, callback) {
		var dumpSize = this.dumpSize;
		var success = callback || function () {};
		var endpoint = '/code/category/fetchFirst';
		var resource = $resource (domain + endpoint + '?category=' + category + '&limit=' + dumpSize);
		return resource.get (success);
	};

	constructor.prototype.getMoreArticles = function (article, callback) {
		var category = article.category;
		var lessThanArticleId = article.articleId;
		var endpoint = '/code/category/fetchMore';
		var success = callback || function () {};
		var resource = $resource (domain + endpoint + '?category=' + category + '&articleId=' + lessThanArticleId + '&limit=' + dumpSize);
		return resource.get (success);
	};

	constructor.prototype.getCategories = function (category, callback) {
		var success = callback || function () {};
		var resource = $resource (domain + '/code/category?name=' + category);
		return resource.query (success);
	};

	constructor.prototype.createCategory = function (name, desc, callback) {
		var success = callback || function () {};
		name = name || '';
		desc = desc || '';
		var resource = 
				$resource (domain + '/code/category/create', {},
					 {
					 	create : {
					 		method : 'POST',
					 		headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
					 	}
					 });
		var postData = encodeURI ('name=' + name + '&desc=' + desc);
		return resource.create (postData, success);
	};

	constructor.prototype.deleteCategory = function (name, callback) {
		var success = callback || function () {};
		name = name || '';
		var resource = $resource (domain + '/code/category/delete', {},
				{
					delete : {
						method : 'POST',
						headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
					}
				}
		);
		var postData = encodeURI ('name=' + name);
		return resource.delete (postData, success);
	};

	constructor.prototype.deleteArticle = function (articleId, callback) {
		var success = callback || function () {};
		var resource = $resource (domain + '/code/category/deleteArticle', {},
				{
					delete : {
						method : 'POST',
						headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
					}
				}
		);
		var postData = encodeURI ('id=' + articleId);
		return resource.delete (postData, success);
	};

	constructor.prototype.filter = function (content) {
		var imgTag = /<img\s+.*?>.*?(<\/img\s*>)?/gi;
		var hrefTag = /<a\s+.*?>(.*)?(<\/a\s*?>)?/gi
		var hrTag = /<hr\s+.*?>(<\/hr\s*?>)?/gi

		var htmlTagNotBreak = /<(?!(\/?br)|(\/?p)).*?>/gi
		var pTagOpening = /<p[^\/]*?>/gi
		var brTagOpening = /<br[^\/]*?>/gi
		
		// remove all html tag except p, br
		content = content.replace (htmlTagNotBreak, '');
		// extract first 300 text
		content = content.substring (0, 300);
		// remove opening tag
		content = content.replace (pTagOpening, '');
		content = content.replace (brTagOpening, '');
		// seed line break
		content = content.replace ('/<\/?.*?>/gi', '&NewLine;');
		// remove trim <
		content = content.replace ('/<.*/gi', '');

		content += '&nbsp ...';
		return content;
	};

	return constructor;
}]);