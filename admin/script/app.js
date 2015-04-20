// app.js

var app = angular.module ('erich0929.app', ['ngRoute', 'erich0929.controller', 'erich0929.service']),
	controller = angular.module ('erich0929.controller', ['erich0929.constant']),
	service = angular.module ('erich0929.service', ['ngResource', 'erich0929.constant']),
	constant = angular.module ('erich0929.constant', []).constant ('domain', 'http://admin.erich0929.com');

	app.config (['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when ('/category', 
			{
				templateUrl : 'script/templates/cat.tmpl.html',
				controller : 'catController',
				resolve : {
					categories : function (CategoryService) {
						var categoryService = new CategoryService ();
						return categoryService.getCategories ().$promise;
					}
				}
			})
			.when ('/category/:category', 
			{
				templateUrl : 'script/templates/catTable.tmpl.html',
				controller : 'catTableController',
				resolve : {
					category : function ($route) {
						return $route.current.params.category;
					},
					articles : function ($route, CategoryService) {
						var category = $route.current.params.category;
						var categoryService = new CategoryService ();
						return categoryService.getFirstArticles (category).$promise;
					}
				}
			})
			.when ('/archive', 
			{
				templateUrl : 'script/templates/archive.tmpl.html',
				controller : 'archiveController',
				resolve : {}
			})
			.when ('/tag', 
			{
				templateUrl : 'script/templates/tag.tmpl.html',
				controller : 'tagController',
				resolve : {}
			})
			.when ('/newArticle', 
			{
				templateUrl : 'script/templates/newArticle.tmpl.html',
				controller : 'newArticleController',
				resolve : {
					categories : function (CategoryService) {
						var categoryService = new CategoryService ();
						return categoryService.getCategories ().$promise;
					},
					category : function ($route) {
						return $route.current.params.category;	
					} 
				}
			})
			.when ('/editArticle', 
			{
				templateUrl : 'script/templates/editArticle.tmpl.html',
				controller : 'editArticleController',
				resolve : {
					categories : function (CategoryService) {
						var categoryService = new CategoryService ();
						return categoryService.getCategories ().$promise;
					},
					article : function ($route, CategoryService) {
						var articleId = $route.current.params.id;
						var categoryService = new CategoryService ();
						return categoryService.getArticle (articleId).$promise;
					}
				}
			})
			.when ('/error/post', 
			{
				templateUrl : 'script/templates/postError.tmpl.html',
				resolve : {
					msg : function ($route) {
						return $route.current.params.msg;
					}
				}
			})
			.otherwise ( { redirectTo : '/category'} );
	}]);
	app.controller ('appController', ['$scope', function ($scope) {

	}]);