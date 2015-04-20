// catController.js

angular.module ('erich0929.controller')
	.controller ('catTableController', 
				['$scope', 'category', 'articles', 'CategoryService', 'dumpSize'
				, function ($scope, category, articles, CategoryService, dumpSize) {
	$scope.category = category;
	$scope.articles = articles.articles;

	$scope.getMore = function () {
		var categoryService = new CategoryService ();
		var articles = $scope.articles;
		var lastArticle = articles [articles.length - 1];
		categoryService.getMoreArticles (lastArticle, function (records) {
			if (records.status) {
				$scope.articles = articles.concat (records.articles);
			} else {
				// do nothing.
			}
		});
		
	};

	console.log (category);
	
	$.contextMenu ({
		selector: '.head',
		callback : function (key, options) {
			var category = $ (this).children ('#category').val ();
			location.href= '/#newArticle?category=' + category;
		},
		items : {
			'create' : {name : 'Create new article', icon: 'add'}
		}
	});
	
	$.contextMenu({
		selector: '.articles', 
		callback : function (key, options) {
			switch (key) {
				case 'create' :
					var category = $ (this).children ('#category').val ();
					location.href= '/#newArticle?category=' + category;
				break;

				case 'update' :
					var statusDom = $ (this);
					var articleId = statusDom.children ('#id').val ();
					location.href= '/#editArticle?id=' + articleId;

				break;

				case 'delete' :
				var statusDom = $ (this);
				var articleId = statusDom.children ('#id').val ();
				if (statusDom.children ('.status').text () == 'Deleted! ') return;
				statusDom.children ('.status').html ('Deleting ... '); 
				var categoryService = new CategoryService ();
				categoryService.deleteArticle (articleId, function (result) {
					if (result.status) {
						statusDom.children ('.status').html ('<i style="color:green;">Deleted! </i>');
					} else {
						statusDom.children ('.status').html ('<i style="color:red;">Failed to delete category! </i>'); 
					}
				}); 
				break;

				
				default:
				break; 
			}
			
		},
		items: {
			"create" : {name: "Add", icon: "add"},
			'update' : {name : "Edit", icon: "edit"},
			"delete": {name: "Delete", icon: "delete"}

			//"sep1": "---------",
			//"quit": {name: "Quit", icon: "quit"}
		}
	});

}]);