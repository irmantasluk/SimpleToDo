function TodoController(TodoService) {

    var vm = this;
    vm.newTodo = '';
    vm.list = [];

    function getTodos() {
        TodoService.retrieve().then(function (response) {
            vm.list = response;
        })
    }

    vm.addTodo = function () {
        vm.list.unshift({
                title: this.newTodo,
                completed: false
            });
        vm.newTodo = '';
    }
    vm.removeTodo = function (item, index) {
        vm.list.splice(index, 1);
    }

    vm.getRemaining = function () {
        return vm.list.filter(function (item) {
            return !item.completed;
        })
    }

    getTodos();
};

angular
    .module('app')
    .controller('TodoController', TodoController);