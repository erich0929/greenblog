// app.js

var app = angular.module ('erich0929.app', ['ngRoute', 'erich0929.controller', 'erich0929.service']),
	controller = angular.module ('erich0929.controller', ['erich0929.constant']),
	service = angular.module ('erich0929.service', ['ngResource', 'erich0929.constant']),
	constant = angular.module ('erich0929.constant', []).constant ('domain', 'http://admin.erich0929.com');

	app.config (['$routeProvider' ,
			function ($routeProvider) {
	
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
				resolve : {
					'archives' : function (ArchiveService) {
						var archiveService = new ArchiveService ();
						return archiveService.getArchives ().$promise;
					}
				}
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
			.when ('/login', 
			{
				templateUrl : 'script/templates/login.tmpl.html',
				controller : 'loginController',
				resolve : {
					auth : function (AuthService) {
						var authService = new AuthService ();
						return authService.isLogined ().$promise;
					}
				}
			})
			.when ('/changePassword', 
			{
				templateUrl : 'script/templates/changePassword.tmpl.html',
				controller : 'changePasswordController',
				resolve : {

				}
			})
			.otherwise ( { redirectTo : '/login'} );
	}]).run (['$rootScope', 'AuthService', '$location',
		 function ($rootScope, AuthService, $location) {
		$rootScope.$on ('$routeChangeStart', function (e, next) {
			var authService = new AuthService ();
			authService.isLogined (function (data) {
				if (data.isLogined) {
					// do nothing
					$rootScope.isLogined = true;
				} else {
					// route to login page.
					$location.path ('/login');
				}
			});
		});
	}]);
	app.controller ('appController', ['$scope', '$rootScope', 'AuthService', 
		function ($scope, $rootScope, AuthService) {
		var authService = new AuthService ();
		authService.isLogined (function (data) {
			if (data.isLogined) {
				$scope.isLogined = true;
			}
		});
	}]);