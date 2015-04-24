// tagService.js

angular.module ('erich0929.service').factory ('TagService', 
	['$resource', 'dumpSize', 'domain', function ($resource, dumpSize, domain) {

	var constructor = function () {
		this.dumpSize = dumpSize;
	};

	// public api
	constructor.prototype.getTags = function (callback) {
		var success = callback || function () {};
		var resource = $resource ('/code/tag');
		return resource.query (success);
	};

	constructor.prototype.getArticles = function (callback) {
		var success = callback || function () {};
		var resource = $resource ('/code/tag/articles');
		return resource.query (success);
	}

	constructor.prototype.getFirstArticles = function (tag, callback) {
		var dumpSize = this.dumpSize;
		var success = callback || function () {};
		var endpoint = '/code/tag/articles';
		var resource = $resource (domain + endpoint + '?tag=' + tag + '&limit=' + dumpSize);
		return resource.query (success);
	};

	constructor.prototype.getMoreArticles = function (tag, article, callback) {
		var lessThanArticleId = article.articleId;
		var endpoint = '/code/tag/articles';
		var success = callback || function () {};
		var resource = $resource (domain + endpoint + '?tag=' + tag + '&articleId=' + lessThanArticleId + '&limit=' + dumpSize);
		return resource.query (success);
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