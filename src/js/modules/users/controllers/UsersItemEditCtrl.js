/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';

	return app.controller('UsersItemEditCtrl', [
		'$scope', '$state', '$stateParams', 'UserService', 'MessageService',
		function ($scope, $state, $stateParams, userService, msg) {
			
			$scope.confirm = function () {
				if ($scope.editUsr.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				userService.update($scope.user.loginName, 
					$scope.fullName, 
					$scope.isAdmin)
				.success(function () {
					msg.success('user updated');
					$state.go('^.details');
				})
				.error(function () {
					msg.failure('user not updated');
				});
			};

			userService.get($stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
				$scope.isAdmin = !!~data.data.groups.indexOf('$admins');
				$scope.fullName = $scope.user.fullName;
			})
			.error(function () {
				msg.failure('user does not exists or you do not have perms');
				$state.go('users');
			});
		}
	]);
});