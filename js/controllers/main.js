(function (angular) {
'use strict'
	var controllers = angular.module('app.controller',['app.services']);

	controllers.controller('MainController',[
		'$scope',
		'$routeParams',
		'$route',
		'MainService',
		function ($scope,$routeParams,$route,MainService) {
		// 设置一个随机的id利用递归的方式
		$scope.txt=''
         $scope.todos =MainService.get();
		$scope.toggled = function(){
			MainService.save();
		}
		// （1）这是添加的函数
			$scope.add = function(){
				if(!$scope.txt){
					// 如果是空格的话，就不会添加，就会返回
					return;
				}
				MainService.add($scope.txt);
				// 因为$scope.txt，是双向数据绑定的，因此，在这里清空就是，在页面清空
				$scope.txt = '';
			}
		// (2)点击“✘”删除
		// $scope.remove = function (id) {
		// 	// 本来标准这么写的，但这是界面逻辑
		// 	MainService.remove(id)
		// }
		$scope.remove = MainService.remove


// (3)点击“clear”删除全部
		$scope.clear =function(){
				// 这个时候todos的位置已经改变，我们要从新绑定位置
				var newtodos = new MainService.clear();
			$scope.todos = newtodos;

		}


		// (3.1)函数衣服那个要有返回值
		$scope.iscomplete = MainService.iscomplete;

		// (4)双击“label”edit
		// 	这句代码代表false  zhekdk
		// 	这个是界面的逻辑，不需要放到service中
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
		$scope.toggle = MainService.toggle
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

			// 自定义比较函数, 默认filter过滤器使用的是模糊匹配
			$scope.equalCompare = function(source, target) {
				// console.log(source);
				// console.log(target);
				// return false;
				return source === target;
			};

console.log($scope.iscomplete())

		// 这是controller结束地方
	}])


})(angular)
