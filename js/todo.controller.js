function TodoController(TodoService) {

    var vm = this;
    vm.newTodo = '';
    vm.list = [];

    function getTodos() {
        TodoService.retrieve().then(function (response) {
            vm.list = response;
        })
    }

    vm.updateTodo = function (item, index) {
        if (!item.title) {
            vm.removeTodo(item, index);
            return;
        }

        TodoService.update(item);
    }

    vm.addTodo = function () {
        if (!vm.newTodo) {
            return;
        }
        TodoService
            .create({
                title: vm.newTodo,
                completed: false
            })
            .then(function (response) {
                vm.list.unshift(response);
                vm.newTodo = '';
            });        
    }
    vm.removeTodo = function (item, index) {
        TodoService.remove(item).then(function (response) {
            vm.list.splice(index, 1);
        });
    }

    vm.toggleState = function (item) {
        TodoService
            .update(item)
            .then(function () {

            }, function () {
                item.completed = !item.completed;
            });
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