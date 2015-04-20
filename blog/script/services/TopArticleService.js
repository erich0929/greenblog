// TopArticleService.js

angular.module ('erich0929.service').factory ('TopArticleService', ['$sce', '$resource', 'domain', function ($sce, $resource, domain) {

	var constructor = function () {

	};

	// public api

	constructor.prototype.getTopArticles = function (callback) {
		var success = callback || function () {};
		var resource = $resource (domain + '/code/topArticles');
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