// viewController.js

angular.module ('erich0929.controller')
	.controller ('viewController', ['$scope', '$sce', 'article', 'comments', 'CommentService',
		function ($scope, $sce, article, comments, CommentService) {
	article.content = $sce.trustAsHtml (article.content);
	$scope.article = article;
	
	$scope.comments = comments;
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '529365033868003',
		    cookie     : true,  // enable cookies to allow the server to access 
            xfbml      : true,  // parse social plugins on this page
    		version    : 'v2.2' // use version 2.2
		});
	};

	$scope.facebookLogin = function () {
        if ($ ('#commentBody').val () == "") {
            alert ("댓글을 입력하세요.");
            return;
        } 
            
		FB.login(function(response){
 			if (response.status === 'connected') {
    			var commentService = new CommentService ();
    			var comment = {};
    			comment ['content'] = $ ('#commentBody').val ();
    			comment ['articleId'] = $scope.article.articleId;
    			comment ['token'] = response.authResponse.accessToken;
    			console.log (comment);

    			commentService.postComment (comment, function (result) {
    				console.log (result.comment);
    				if (result.status) {
    					$ ('#commentBody').val ('');
    					$ ('#commentAlarm').html ('<p style="color: blue;">Thanks for your comment^^</p>');
    					$scope.comments = result.comments;
    				} else {
    					$ ('#commentAlarm').html ('<p style="color: red;">Failed to add your comment...</p>');
    				}

    			});
  			}
		}, {scope: 'user_about_me, public_profile , email'});
	};
}]);