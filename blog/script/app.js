// app.js

var app = angular.module ('erich0929.app', ['ngRoute', 'erich0929.controller', 'erich0929.service']),
	controller = angular.module ('erich0929.controller', ['erich0929.service', 'erich0929.constant']),
	service = angular.module ('erich0929.service', ['ngResource', 'erich0929.constant']),
	constant = angular.module ('erich0929.constant', []).constant ('domain', 'http://blog.erich0929.com');
	angular.module ('erich0929.constant').constant ('dumpSize', 10);
	app.config (['$routeProvider', function ($routeProvider) {

		$routeProvider
			.when ('/main', 
			{
				templateUrl : 'script/templates/main.tmpl.html',
				controller : 'mainController',
				resolve : 
				{ 
					topArticles : function ($route, $sce, TopArticleService) {
						var topArticleService = new TopArticleService ();
						var callback = function (data) {
							for (var i = 0; i < data.length; i++) {
								var article = data [i];
								article.content = topArticleService.filter (article.content);
								article.content = $sce.trustAsHtml (article.content);
							}
							return data;
						};
						return topArticleService.getTopArticles (callback).$promise;
					},
					categories : function ($rootScope, CategoryService) {
						var categoryService = new CategoryService ();
						var callback = function (categories) {
							$rootScope.categories = categories;
						};
						return categoryService.getCategories ('', callback).$promise;
					}
				}
			})
			.when ('/article/:articleId', 
			{
				templateUrl : 'script/templates/view.tmpl.html',
				controller : 'viewController',
				resolve : {
					article : function ($route, ArticleService) {
						var articleId = $route.current.params.articleId;
						var articleService = new ArticleService ();
						return articleService.getArticle (articleId).$promise;
					},
					comments : function ($route, CommentService) {
						var articleId = $route.current.params.articleId;
						var commentService = new CommentService ();
						return commentService.getComments (articleId).$promise;
					}
				}
			})
			.when ('/category/:category', 
			{
				templateUrl : 'script/templates/category.tmpl.html',
				controller : 'articleListController',
				resolve : {
					articles : function ($route, CategoryService) {
						var category = $route.current.params.category;
						var categoryService = new CategoryService ();
						return categoryService.getFirstArticles (category).$promise;
					}
				}
			})
			.when ('/tag/:tag', 
			{
				templateUrl : 'script/templates/category.tmpl.html',
				controller : 'tagController', 
				resolve : {
					articles : function ($route, TagService) {
						var tag = $route.current.params.tag;
						var tagService = new TagService ();
						return tagService.getFirstArticles (tag).$promise;
					},
					tag : function ($route) {
						return $route.current.params.tag;
					}
				}
			})
			.otherwise ( { redirectTo : '/main'} );

	}]);

	app.controller ('appController', 
		['$scope', '$rootScope', 'CategoryService', 'TagService', 'ArchiveService', 
		function ($scope, $rootScope, CategoryService, TagService, ArchiveService) {
		var categoryService = new CategoryService ();
		var callback = function (categories) {
			$scope.categories = categories;
		};
		categoryService.getCategories ('', callback);

		var tagService = new TagService ();
		tagService.getTags (function (tags) {  
			$scope.tags = tags;
		}); 

		// get archives
		var archiveService = new ArchiveService ();
		archiveService.getArchives (function (archives) {
			$scope.archives = archives;
		});
	}]);
