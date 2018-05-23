(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	;


	var ap = angular.module('myapp',['ngRoute'])
// 配置路由
	ap.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			// 这是进行参数匹配
			.when('/:status?',{
				controller:'myController',
				templateUrl:'vieTemplate'
			})
			// 这是让地址为空  传进去的是一个对象参数
			.otherwise({redirectTo:'/'})


	}])
	ap.controller('myController',['$scope','$routeParams','$route',function ($scope,$routeParams,$route) {
  // 设置一个随机的id利用递归的方式
		function getid() {
			var id= Math.random();
			for(let i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					getid();
					break;  //利用自己调用自己
				}
				return id;
			}
		}
		$scope.txt=''
		$scope.todos=[
			{
				id:1,
				works:'吃饭',
				completed:false
			},
			{
				id:2,
				works:'睡觉',
				completed:false
			},
			{
				id:3,
				works:'打豆豆',
				completed:true
			}
		]
 // （1）这是添加的函数
		$scope.add = function () {
			 $scope.todos.push({
				id:getid(),
				/* 因为是双向数据绑定的 ng -model 可是将数据传到controller当中 */
				works:$scope.txt,
				completed:false
			})
			$scope.txt='';
		}
		// (2)点击“✘”删除
		$scope.remove = function (id) {
			for (let i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
				}
			}
		}
		// (3)点击“clear”删除全部
		$scope.clear = function (id) {
			var  nowtodos = [];
			for (let i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					nowtodos.push($scope.todos[i]);
				}
			}
			$scope.todos=nowtodos;
		}

// (3)点击“clear”删除全部
		$scope.clear = function (id) {
			var  nowtodos = [];
			for (let i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					nowtodos.push($scope.todos[i]);
				}
			}
			$scope.todos=nowtodos;
		}

		// (3.1)函数衣服那个要有返回值
		$scope.iscomplete = function(){
			for(let i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return ture;
				}
				return false;
			}
		}

  // (4)双击“label”edit
	// 	这句代码代表false
		$scope.editlabel =-1;
		// 当修改编辑时做出的反应
		$scope.edit = function (id) {
			// 这句代码代表true
		$scope.editlabel = id;
	};
		// 当修改之后，退出做出的反应
		$scope.endedit = function(){
			// 变为false ，可用于class添加
			$scope.editlabel =-1;
		}

		// (5),全部选中
		var $now=true;
		$scope.toggle = function () {
			for(let i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed =$now;
			}
			$now =!$now;
		}
		// (6)通过路由进行切换
		// 通过外添加路由进行参数切换  达到spa 的变化
		 $scope.select = {};
		// 路由参数
		var status = $routeParams.status;
		switch (status){
			case 'active': $scope.select = {completed:false};;break;
			case 'completed': $scope.select = {completed:true};break;
			default:
				// 引入$route,让里面的参数为空
				$route.updateParams({status:''});
				$scope.select={};
				;break;
		}





		// 这是controller结束地方
	}])




})(angular);
