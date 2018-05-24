(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	;


	var ap = angular.module('myapp',['ngRoute','app.controller'])
// 配置路由
	ap.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
		// 这是进行参数匹配
			.when('/:status?',{
				controller:'MainController',
				templateUrl:'vieTemplate'
			})
			// 这是让地址为空  传进去的是一个对象参数
			.otherwise({redirectTo:'/'})

	}])




})(angular);
