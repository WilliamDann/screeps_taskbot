"use strict";
exports.__esModule = true;
exports.TaskPool = void 0;
var Task_1 = require("./Task");
var TaskPool = /** @class */ (function () {
    function TaskPool() {
        this.tasks = [];
        this.unassigned = [];
    }
    TaskPool.prototype.load = function (obj) {
        this.tasks = this.load_task_list(obj['tasks']);
        this.unassigned = this.load_task_list(obj['unassigned']);
    };
    TaskPool.prototype.load_task_list = function (list_data) {
        var data = [];
        for (var _i = 0, list_data_1 = list_data; _i < list_data_1.length; _i++) {
            var task = list_data_1[_i];
            var obj = new Task_1.Task([]);
            obj.load(task);
            data.push(obj);
        }
        return data;
    };
    TaskPool.prototype.add_assigned = function (task) {
        this.tasks.push(task);
    };
    TaskPool.prototype.add_unassigned = function (task) {
        this.unassigned.push(task);
    };
    TaskPool.prototype.run = function () {
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks.pop();
            task.run();
            if (!task.is_complete())
                this.tasks.push(task);
        }
    };
    TaskPool.prototype.assign_tasks = function () {
        var _this = this;
        var free_creeps = Object.values(Game.creeps).filter(function (x) { return !_this.creep_on_top_task(x); });
        while (free_creeps.length > 0 && this.unassigned.length > 0) {
            var task = this.unassigned.pop();
            var creep = free_creeps.pop();
            task.assign_all_steps(creep);
            this.tasks.push(task);
        }
    };
    TaskPool.prototype.creep_on_top_task = function (creep) {
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            if (task.steps[0].assignee_id == creep.name)
                return true;
        }
        return false;
    };
    return TaskPool;
}());
exports.TaskPool = TaskPool;
