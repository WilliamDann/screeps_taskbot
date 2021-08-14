"use strict";
exports.__esModule = true;
exports.TaskBuilder = void 0;
var Task_1 = require("./Task");
var TaskBuilder = /** @class */ (function () {
    function TaskBuilder() {
        this._step = new Task_1.Step();
        this._steps = [];
    }
    TaskBuilder.prototype.target = function (target_id) {
        this._step.target_id = target_id;
        return this;
    };
    TaskBuilder.prototype.pos = function (pos) {
        this._step.target_pos = pos;
        return this;
    };
    TaskBuilder.prototype.func = function (func_name) {
        this._step.func_name = func_name;
        return this;
    };
    TaskBuilder.prototype.until = function (until_func) {
        var func_name = until_func.split(':')[0];
        var args = until_func.split(':')[1].split(',');
        for (var i = 0; i < args.length; i++) {
            var num = parseInt(args[i]);
            if (num != NaN)
                args[i] = num;
        }
        this._step.until_func = func_name;
        this._step.until_args = args;
        return this;
    };
    TaskBuilder.prototype.assign = function (creep) {
        this._step.assignee_id = creep.name;
        return this;
    };
    TaskBuilder.prototype.assign_all_steps = function (creep) {
        this._step.assignee_id = creep.id;
        this._steps.forEach(function (step) { return step.assignee_id = creep.name; });
        return this;
    };
    TaskBuilder.prototype.step = function () {
        this._steps.push(this._step);
        this._step = new Task_1.Step();
        return this;
    };
    TaskBuilder.prototype.build = function () {
        this.step();
        return new Task_1.Task(this._steps);
    };
    return TaskBuilder;
}());
exports.TaskBuilder = TaskBuilder;
