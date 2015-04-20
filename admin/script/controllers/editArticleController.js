// editArticleController.js

angular.module ('erich0929.controller')
	.controller ('editArticleController', ['$scope', 'categories', 'article', 'domain', 
		function ($scope, categories, article, domain) {
	$scope.categories = categories;
	$scope.category = (function () {
		for (var i = 0; i < categories.length; i++) {
			if (categories [i].name == article.category) return categories [i];
		}
	}) ();
	$scope.article = article;
	$scope.author = article.author;
	$scope.title = article.title;
	$scope.content = article.content;
	$scope.tags = article.tags;
	$ ('#tagString').val ($scope.tags.toString ());
	$ ('#tagPreview').html ('<p style="color: green;">' + $scope.tags + '</p>');

	/* 
	 * template scripts 
	 */
	CKEDITOR.config.width = 200;     // 500 pixels wide.
	CKEDITOR.replace ('editor1', { width: '570', height: '300'});
	var div = $(".upload-window");
            div.dialog ({ autoOpen : false, modal : true });
            $("#upload-button").click(function () {
                div.dialog ('open');
                return false;
            });
	$ ('#uploadForm').submit (function (e) {
		e.preventDefault ();
		var formData = new FormData (this);
		
		//return false;
		$.ajax ({
			url : domain + '/code/upload/image',
			type : 'post',
			data : formData,
			mimeType : 'multipart/form-data',
			processData: false,
			contentType: false,
			success : function (data) {
				div.dialog ('close');
				data = JSON.parse (data);
				if (data.status) {
					window.prompt("Copy to clipboard: Ctrl+C, Enter", data.url);
				} else {
					alert ("Upload Error: " + data.error);
				}
			},
			error:function(request,status,error){
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+ error);
			}
		});
		return false;

	}); 

	$scope.upload = function () {
		$ ('#uploadForm').submit ();
	}; // template scripts

	$scope.getTags = function () {
		var tagString = $ ('#tagString').val ();
		var htmlTagRegex = /<.+?>/gi;
		var delimiter = /[,\|.`'";]+/gi
		var trim = /[,\|.`'";\s]+$/i
		// trim
		tagString = tagString.replace (trim, '');
		// remove htmltag
		tagString = tagString.replace (htmlTagRegex, '');
		// remove delimiter
		tagString = tagString.replace (delimiter, ' ');
		var tags = tagString.split (/\s+/gi, 3);
		$ ('#tagPreview').html ('<p style="color: green;">' + tags + '</p>');
		$scope.tags = tags.toString ();
		//console.log ($scope.tags);
	}
}]);