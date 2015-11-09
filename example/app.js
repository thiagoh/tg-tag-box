(function(angular, _) {

	angular.module('demo', ['tgTagBoxModule'])
		.controller('DemoCtrl', ['$scope', '$q', '$timeout', '$log', function($scope, $q, $timeout, $log) {

			$scope.output = [];

			var data = ['visual-basic', 'basic', 'pascal', 'haskell', 'scala', 'fortran', 'cobol', 'delphi', 'groovy', 'lua', 'swift', 'python', 'ruby', 'sql', 'java', 'javascript', 'php', 'c', 'c++', 'c#', 'objective-c'];

			$scope.search = function search(query) {

				var deferred = $q.defer(),
					promise = deferred.promise;

				$timeout(function() {

					var result = _(data).filter(function(cur) {

						return cur.indexOf(query) >= 0;

					}).map(function(cur) {

						return cur;
					});

					return deferred.resolve(result);

				}, Math.random() * 700);

				return promise;
			};
		}]);

}(angular, _));