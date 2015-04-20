// catController.js

angular.module ('erich0929.controller')
.controller ('catController', ['$scope', 'CategoryService', 'categories', '$sce', function ($scope, CategoryService, categories, $sce) {
	$scope.categories = categories;

	$scope.createCategory = function (name, desc) {
		if (!name || !desc) {
			$ ('.message').html ('<i style="color:red;">Invalid name or description!</i>');
			return;
		}
		$ ('.message').html ('<i>pending ... </i>');
		var categoryService = new CategoryService ();
		categoryService.createCategory (name, desc, function (result) {
			if (result.status) {
				$ ('.message').html ('<i style="color:green;">Complete to create category ^^</i>');
				result.category.status = $sce.trustAsHtml ('<i style="color:green;">Created</i>');
				$scope.categories.push (result.category);
				$scope.name = '';
				$scope.desc = '';
			} else {
				$ ('.message').html ('<i style="color:red;">Failed to create category! </i>');
			}
		});
	};

	$.contextMenu({
		selector: '.categories', 
		callback : function (key, options) {
			var name = $(this).children ('.name').text();
			var statusDom = $ (this);
			//console.log (statusDom.children ('.status').text ());
			if (statusDom.children ('.status').text () == 'Deleted! ') return;
			statusDom.children ('.status').html ('Deleting ... '); 
			var categoryService = new CategoryService ();
			categoryService.deleteCategory (name, function (result) {
				if (result.status) {
					statusDom.children ('.status').html ('<i style="color:green;">Deleted! </i>');
				} else {
					statusDom.children ('.status').html ('<i style="color:red;">Failed to delete category! </i>'); 
				}
			});
		},
		items: {
			"delete": {name: "Deletes", icon: "delete"}
			//"sep1": "---------",
			//"quit": {name: "Quit", icon: "quit"}
		}
	});

}]);