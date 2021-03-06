define(['./_module'], function (app) {

    'use strict';

    return app.controller('UsersItemResetCtrl', [
		'$scope', '$state', 'UserService', 'MessageService',
		function ($scope, $state, userService, msg) {
			
			$scope.confirm = function () {
				if ($scope.resetPwd.$invalid) {
					msg.warn('Please fix all validation errors');
					return;
				}

				userService.resetPassword($scope.user.loginName, $scope.password)
				.success(function () {
					msg.success('Password has been reset');
					$state.go('^.details');
				})
				.error(function () {
					msg.failure('password not reseted');
				});
			};

			userService.get($scope.$stateParams.username)
			.success(function (data) {
				$scope.user = data.data;
			})
			.error(function () {
				msg.failure('uUser does not exists or you do not have permissions');
				$state.go('users');
			});
		}
	]);
});