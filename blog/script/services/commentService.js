// commentService.js

angular.module ('erich0929.service').factory ('CommentService', ['$resource', function ($resource) {
	var constructor = function () {

	};

	// public api
	constructor.prototype.getComments = function (articleId, callback) {
		var success = callback || function () {};
		var endpoint = '/code/comment/all?articleId=' + articleId;
		var resource = $resource (endpoint);
		return resource.query (success);
	};

	constructor.prototype.postComment = function (comment, callback) {
		var success = callback || function () {};
		var resource = $resource ('/code/comment', {}, {
					 	save : {
					 		method : 'POST',
					 		headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
					 	}
		});
		var data = encodeURI ('articleId=' + comment ['articleId'] + 
					'&content=' + comment ['content'] + 
					'&token=' + comment ['token']);
		//console.log (data);
		return resource.save (data, success); 
	};

	return constructor;
}]);