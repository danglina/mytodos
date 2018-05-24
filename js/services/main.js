(function (angular) {
	angular.module('app.services',[])
		.service('MainService',['$window',function ($window) {
			// $window是angular提供给的，先创建一个localstorage的对象
			var storage = $window.localStorage;
			var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];

			this.save= function () {
				storage['my_todo_list'] = JSON.stringify(todos);
			}
   			// 控制私有访问权限
			this.get  =function () {
				return todos;
			}

   			// 内部函数  提供自己调用

			function getid() {
				var id= Math.random();
				for(let i=0;i<todos.length;i++){
					if(todos[i].id===id){
						getid();
						break;  //利用自己调用自己
					}
					return id;
				}
			}
			// （1）这是添加的函数
			this.add = function (txt) {
				todos.push({
					id:getid(),
					/* 因为是双向数据绑定的 ng -model 可是将数据传到controller当中 */
					// txt是双向数据绑定的，一次是可以拿到的
					works:txt,
					completed:false
				})
				// 这个是保存在本地
				this.save();
			}
			// (2)点击“✘”删除
			this.remove = function (id) {
				for (let i = 0; i < todos.length; i++) {
					if (todos[i].id === id) {
						todos.splice(i, 1);
						break;
					}
				}

				save();
			}
             function save() {
				 storage['my_todo_list'] = JSON.stringify(todos);
			 }
          // (3)点击“clear”删除全部
			this.clear = function (id) {

				var  nowtodos = [];
				for (let i = 0; i < todos.length; i++) {
					if (!todos[i].completed) {
						nowtodos.push(todos[i]);
					}
				}
				// 这个时候clear 的地址，已经指向另外一个位置；因此会将它删不掉，我们可以将他再次实例化
				todos=nowtodos;
				// 这个是保存在本地
				save();
				return todos;
			}

			// (4)判断是否已经完成
			this.iscomplete = function(){
				for(let i=0;i<todos.length;i++){
					if(todos[i].completed){
						return true;
					}
				}
				return false;
			}

			// (5),全部选中
			var $now=true;
			this.toggle = function () {
				for(let i=0;i<todos.length;i++){
					todos[i].completed =$now;
				}
				$now =!$now;
				// 这个是保存在本地
				this.save();
			}
			this.update=function(id,target){
				// 这个是保存在本地
				this.save();
			}


		// service结束
		}])

})(angular)
